import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteOrderService } from '../../services/remote-order.service';
import { Order } from '../../models/order.model';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: RemoteOrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => {
      console.log('Orders received:', orders);
      this.orders = orders;
    });
  }
} 