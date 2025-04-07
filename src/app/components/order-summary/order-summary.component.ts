import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';

interface Order {
  total?: number;
}

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe],
  template: `
    <div class="order-summary">
      <h2>Order Summary</h2>
      <div class="summary-content">
        <ng-content></ng-content>
        <div class="total" *ngIf="order.total">
          <h3>Total: {{ order.total | currencyFormat }}</h3>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .order-summary {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      margin-left: 20px;
      flex: 1;
      min-width: 300px;
    }

    h2 {
      color: #333;
      margin-bottom: 20px;
      font-size: 1.5rem;
    }

    .summary-content {
      background-color: white;
      border-radius: 4px;
      padding: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .total {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #dee2e6;
    }
  `]
})
export class OrderSummaryComponent {
  order: Order = {
    total: 0
  };
} 