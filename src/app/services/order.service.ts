import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable();

  constructor() {}

  addOrder(order: Omit<Order, 'id' | 'date'>): void {
    const newOrder: Order = {
      ...order,
      id: uuidv4(),
      date: new Date()
    };
    
    const currentOrders = this.ordersSubject.value;
    this.ordersSubject.next([...currentOrders, newOrder]);
  }

  getOrders(): Observable<Order[]> {
    return this.orders$;
  }
} 