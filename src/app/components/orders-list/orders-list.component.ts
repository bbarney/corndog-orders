import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe],
  template: `
    <div class="orders-list">
      <h2>Orders</h2>
      <div class="orders-container">
        <div *ngFor="let order of orders" class="order-card">
          <div class="order-header">
            <h3>Order #{{ order.id.slice(0, 8) }}</h3>
            <span class="order-date">{{ order.date | date:'medium' }}</span>
          </div>
          <div class="customer-info">
            <p><strong>Customer:</strong> {{ order.customerName }}</p>
            <p><strong>Phone:</strong> {{ order.phoneNumber }}</p>
          </div>
          <div class="order-items">
            <h4>Items:</h4>
            <div *ngFor="let item of order.items" class="order-item">
              <span>{{ item.menuItem.name }} x {{ item.quantity }}</span>
              <span class="item-price">{{ item.menuItem.price * item.quantity | currencyFormat }}</span>
            </div>
          </div>
          <div class="order-total">
            <strong>Total:</strong> {{ order.totalAmount | currencyFormat }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .orders-list {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      color: #333;
      margin-bottom: 20px;
    }

    .orders-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .order-card {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }

    .order-date {
      color: #666;
      font-size: 0.9rem;
    }

    .customer-info {
      margin-bottom: 15px;
    }

    .customer-info p {
      margin: 5px 0;
    }

    .order-items {
      margin-bottom: 15px;
    }

    .order-items h4 {
      margin-bottom: 10px;
    }

    .order-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }

    .item-price {
      color: #28a745;
    }

    .order-total {
      padding-top: 10px;
      border-top: 1px solid #eee;
      text-align: right;
      font-size: 1.1rem;
    }
  `]
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }
} 