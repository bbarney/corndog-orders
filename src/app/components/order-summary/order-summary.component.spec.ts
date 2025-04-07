import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderSummaryComponent } from './order-summary.component';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { Component } from '@angular/core';

describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        CurrencyFormatPipe,
        OrderSummaryComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default order total of 0', () => {
    expect(component.order.total).toBe(0);
  });

  it('should display the total when order.total is set', () => {
    component.order.total = 10.99;
    fixture.detectChanges();

    const totalElement = fixture.nativeElement.querySelector('.total h3');
    expect(totalElement).toBeTruthy();
    expect(totalElement.textContent).toContain('10.99');
  });

  it('should not display the total when order.total is 0', () => {
    component.order.total = 0;
    fixture.detectChanges();

    const totalElement = fixture.nativeElement.querySelector('.total');
    expect(totalElement).toBeFalsy();
  });

  it('should render the component with correct structure', () => {
    const summaryElement = fixture.nativeElement.querySelector('.order-summary');
    expect(summaryElement).toBeTruthy();

    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Order Summary');

    const contentElement = fixture.nativeElement.querySelector('.summary-content');
    expect(contentElement).toBeTruthy();
  });

  it('should apply correct styling', () => {
    const summaryElement = fixture.nativeElement.querySelector('.order-summary');
    const computedStyle = window.getComputedStyle(summaryElement);

    expect(computedStyle.backgroundColor).toBe('rgb(228, 228, 228)');
    expect(computedStyle.borderRadius).toBe('8px');
    expect(computedStyle.padding).toBe('20px');
  });

  it('should handle ng-content projection', () => {
    // Create a test component that uses OrderSummaryComponent
    @Component({
      template: `
        <app-order-summary>
          <div class="test-content">Test Content</div>
        </app-order-summary>
      `,
      standalone: true,
      imports: [OrderSummaryComponent]
    })
    class TestComponent {}

    const testFixture = TestBed.createComponent(TestComponent);
    testFixture.detectChanges();

    const projectedContent = testFixture.nativeElement.querySelector('.test-content');
    expect(projectedContent).toBeTruthy();
    expect(projectedContent.textContent).toContain('Test Content');
  });
}); 