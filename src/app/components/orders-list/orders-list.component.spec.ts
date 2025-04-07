import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersListComponent } from './orders-list.component';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { of } from 'rxjs';

describe('OrdersListComponent', () => {
  let component: OrdersListComponent;
  let fixture: ComponentFixture<OrdersListComponent>;
  let orderService: jasmine.SpyObj<OrderService>;

  const mockOrders: Order[] = [
    {
      id: '1',
      customerName: 'Homer Simpson',
      phoneNumber: '555-123-4567',
      items: [
        { menuItem: { id: '1', name: 'Epic', price: 5.99, description: 'Epic Corndog' }, quantity: 2 }
      ],
      totalAmount: 11.98,
      date: new Date('2024-01-01'),
      orderType: 'Manual'
    },
    {
      id: '2',
      customerName: 'Marge Simpson',
      phoneNumber: '555-987-6543',
      items: [
        { menuItem: { id: '2', name: 'Classic', price: 4.99, description: 'Classic Corndog' }, quantity: 1 }
      ],
      totalAmount: 4.99,
      date: new Date('2024-01-02'),
      orderType: 'Manual'
    }
  ];

  beforeEach(async () => {
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['getOrders']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        CurrencyFormatPipe,
        OrdersListComponent
      ],
      providers: [
        { provide: OrderService, useValue: orderServiceSpy }
      ]
    }).compileComponents();

    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty orders array', () => {
    expect(component.orders).toEqual([]);
  });

  it('should load orders from service on initialization', () => {
    orderService.getOrders.and.returnValue(of(mockOrders));
    fixture.detectChanges();
    expect(orderService.getOrders).toHaveBeenCalled();
    expect(component.orders).toEqual(mockOrders);
  });

  it('should display orders in reverse chronological order', () => {
    orderService.getOrders.and.returnValue(of(mockOrders));
    fixture.detectChanges();
    expect(component.orders[0].customerName).toBe('Marge Simpson');
    expect(component.orders[1].customerName).toBe('Homer Simpson');
  });

  it('should render orders in the template', () => {
    orderService.getOrders.and.returnValue(of(mockOrders));
    fixture.detectChanges();

    const orderElements = fixture.nativeElement.querySelectorAll('.order-card');
    expect(orderElements.length).toBe(2);

    const firstOrder = orderElements[0];
    const customerInfo = firstOrder.querySelector('.customer-info');
    expect(customerInfo.querySelector('p').textContent).toContain('Marge Simpson');
    expect(customerInfo.querySelectorAll('p')[1].textContent).toContain('555-987-6543');
    
    const orderTotal = firstOrder.querySelector('.order-total');
    expect(orderTotal.textContent).toContain('4.99');
  });

  it('should display order items correctly', () => {
    orderService.getOrders.and.returnValue(of(mockOrders));
    fixture.detectChanges();

    const firstOrder = fixture.nativeElement.querySelector('.order-card');
    const items = firstOrder.querySelectorAll('.order-item');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('Classic');
    expect(items[0].textContent).toContain('1');
  });

  it('should format dates correctly', () => {
    orderService.getOrders.and.returnValue(of(mockOrders));
    fixture.detectChanges();

    const firstOrder = fixture.nativeElement.querySelector('.order-card');
    const dateElement = firstOrder.querySelector('.order-date');
    expect(dateElement.textContent).toMatch(/Jan.*2024/);
  });

  it('should display order type', () => {
    orderService.getOrders.and.returnValue(of(mockOrders));
    fixture.detectChanges();

    const firstOrder = fixture.nativeElement.querySelector('.order-card');
    const typeElement = firstOrder.querySelector('.order-type');
    expect(typeElement.textContent).toContain('Manual');
  });
}); 