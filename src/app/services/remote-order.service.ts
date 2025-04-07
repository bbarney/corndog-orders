import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, merge, map } from 'rxjs';
import { Order } from '../models/order.model';
import { MenuItem } from '../models/menu-item.model';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class RemoteOrderService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private menuItems: MenuItem[] = [];
  private manualOrderSubject = new BehaviorSubject<Order | null>(null);

  constructor(private menuService: MenuService) {
    // Initialize menu items
    this.menuService.getMenuItems().subscribe(items => {
      this.menuItems = items;
    });

    // Create timer stream for random orders
    const randomOrderStream = interval(30000).pipe(
      map(() => this.generateRandomOrder())
    );

    // Combine manual orders and random orders
    merge(
      this.manualOrderSubject.pipe(
        map(order => order ? [order] : [])
      ),
      randomOrderStream.pipe(
        map(order => [order])
      )
    ).subscribe(newOrders => {
      if (newOrders.length > 0) {
        const currentOrders = this.ordersSubject.value;
        this.ordersSubject.next([...currentOrders, ...newOrders]);
      }
    });
  }

  private generateRandomOrder(): Order {
    const randomName = `Customer-${Math.floor(Math.random() * 1000)}`;
    const randomPhone = `555-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    // Generate 1-3 random items
    const numItems = Math.floor(Math.random() * 3) + 1;
    const items = Array.from({ length: numItems }, () => {
      const menuItem = this.menuItems[Math.floor(Math.random() * this.menuItems.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      return { menuItem, quantity };
    });

    const totalAmount = items.reduce((total, item) => 
      total + (item.menuItem.price * item.quantity), 0);

    const order = {
      id: crypto.randomUUID(),
      customerName: randomName,
      phoneNumber: randomPhone,
      items,
      totalAmount,
      date: new Date(),
      orderType: 'Remote' as const
    };

    console.log('Generated remote order:', order);
    return order;
  }

  addOrder(order: Order): void {
    console.log('Adding manual order:', order);
    this.manualOrderSubject.next(order);
  }

  getOrders(): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }
} 