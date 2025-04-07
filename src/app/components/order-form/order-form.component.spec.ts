import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderFormComponent } from './order-form.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { OrderService } from '../../services/order.service';
import { of } from 'rxjs';
import { MenuItem } from '../../models/menu-item.model';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';

describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;
  let menuService: jasmine.SpyObj<MenuService>;
  let orderService: jasmine.SpyObj<OrderService>;

  const mockMenuItems: MenuItem[] = [
    { id: '1', name: 'Epic', price: 5.99, description: 'Epic Corndog' },
    { id: '2', name: 'Classic', price: 4.99, description: 'Classic Corndog' },
    { id: '3', name: 'Spicy', price: 6.99, description: 'Spicy Corndog' }
  ];

  beforeEach(async () => {
    const menuServiceSpy = jasmine.createSpyObj('MenuService', ['getMenuItems']);
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['addOrder']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        OrderSummaryComponent,
        OrderFormComponent
      ],
      providers: [
        FormBuilder,
        { provide: MenuService, useValue: menuServiceSpy },
        { provide: OrderService, useValue: orderServiceSpy }
      ]
    }).compileComponents();

    menuService = TestBed.inject(MenuService) as jasmine.SpyObj<MenuService>;
    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    menuService.getMenuItems.and.returnValue(of(mockMenuItems));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize the form with empty values', () => {
      expect(component.orderForm.get('customerName')?.value).toBe('');
      expect(component.orderForm.get('phoneNumber')?.value).toBe('');
      expect(component.items.length).toBe(0);
    });

    it('should load menu items on initialization', () => {
      expect(menuService.getMenuItems).toHaveBeenCalled();
      expect(component.menuItems).toEqual(mockMenuItems);
    });
  });

  describe('addItem', () => {
    it('should add a new item to the form array', () => {
      component.addItem();
      expect(component.items.length).toBe(1);
      expect(component.items.at(0).get('name')?.value).toBe('Epic');
      expect(component.items.at(0).get('quantity')?.value).toBe(1);
    });

    it('should add multiple items correctly', () => {
      component.addItem();
      component.addItem();
      expect(component.items.length).toBe(2);
    });
  });

  describe('removeItem', () => {
    it('should remove an item from the form array', () => {
      component.addItem();
      component.addItem();
      component.removeItem(0);
      expect(component.items.length).toBe(1);
    });

    it('should not throw error when removing non-existent index', () => {
      expect(() => component.removeItem(0)).not.toThrow();
    });
  });

  describe('getItemPrice', () => {
    it('should return correct price for existing item', () => {
      component.addItem();
      const item = component.items.at(0);
      item.get('name')?.setValue('Epic');
      expect(component.getItemPrice(item)).toBe(5.99);
    });

    it('should return 0 for non-existent item', () => {
      component.addItem();
      const item = component.items.at(0);
      item.get('name')?.setValue('NonExistent');
      expect(component.getItemPrice(item)).toBe(0);
    });
  });

  describe('calculateTotal', () => {
    it('should calculate total correctly for single item', () => {
      component.addItem();
      const item = component.items.at(0);
      item.get('name')?.setValue('Epic');
      item.get('quantity')?.setValue(2);
      expect(component.calculateTotal()).toBe(11.98);
    });

    it('should calculate total correctly for multiple items', () => {
      component.addItem();
      component.addItem();
      component.items.at(0).get('name')?.setValue('Epic');
      component.items.at(0).get('quantity')?.setValue(2);
      component.items.at(1).get('name')?.setValue('Classic');
      component.items.at(1).get('quantity')?.setValue(1);
      expect(component.calculateTotal()).toBe(16.97);
    });

    it('should return 0 when no items', () => {
      expect(component.calculateTotal()).toBe(0);
    });
  });

  describe('submitOrder', () => {
    it('should not submit invalid form', () => {
      component.submitOrder();
      expect(orderService.addOrder).not.toHaveBeenCalled();
    });

    it('should submit valid form with correct order data', () => {
      // Set up form with valid data
      component.orderForm.get('customerName')?.setValue('Test Customer');
      component.orderForm.get('phoneNumber')?.setValue('555-123-4567');
      component.addItem();
      component.items.at(0).get('name')?.setValue('Epic');
      component.items.at(0).get('quantity')?.setValue(2);

      component.submitOrder();

      expect(orderService.addOrder).toHaveBeenCalled();
      const submittedOrder: Order = orderService.addOrder.calls.mostRecent().args[0];
      expect(submittedOrder.customerName).toBe('Test Customer');
      expect(submittedOrder.phoneNumber).toBe('555-123-4567');
      expect(submittedOrder.items.length).toBe(1);
      expect(submittedOrder.items[0].menuItem.name).toBe('Epic');
      expect(submittedOrder.items[0].quantity).toBe(2);
      expect(submittedOrder.totalAmount).toBe(11.98);
      expect(submittedOrder.orderType).toBe('Manual');
    });

    it('should reset form after successful submission', () => {
      // Set up form with valid data
      component.orderForm.get('customerName')?.setValue('Test Customer');
      component.orderForm.get('phoneNumber')?.setValue('555-123-4567');
      component.addItem();
      component.items.at(0).get('name')?.setValue('Epic');
      component.items.at(0).get('quantity')?.setValue(2);

      component.submitOrder();

      expect(component.orderForm.get('customerName')?.value).toBeNull();
      expect(component.orderForm.get('phoneNumber')?.value).toBeNull();
      expect(component.items.length).toBe(0);
    });
  });
}); 