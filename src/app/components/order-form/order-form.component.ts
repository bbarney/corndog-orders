import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { MenuService } from '../../services/menu.service';
import { RemoteOrderService } from '../../services/remote-order.service';
import { MenuItem } from '../../models/menu-item.model';
import { Order } from '../../models/order.model';

interface OrderItem {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, OrderSummaryComponent],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  menuItems: MenuItem[] = [];

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private orderService: RemoteOrderService
  ) {
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      items: this.fb.array([])
    });
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe((items: MenuItem[]) => {
      this.menuItems = items;
    });
  }

  addItem(): void {
    this.items.push(this.fb.group({
      name: ['Epic', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    }));
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  getItemPrice(item: any): number {
    const menuItem = this.menuItems.find((i: MenuItem) => i.name === item.get('name').value);
    return menuItem ? menuItem.price : 0;
  }

  calculateTotal(): number {
    return this.items.controls.reduce((total: number, item: any) => 
      total + (this.getItemPrice(item) * item.get('quantity').value), 0);
  }

  submitOrder(): void {
    console.log('Form validity:', this.orderForm.valid);
    console.log('Form value:', this.orderForm.value);
    
    if (this.orderForm.valid) {
      const menuItems = this.items.controls.map(item => {
        const nameControl = item.get('name');
        const quantityControl = item.get('quantity');
        
        if (!nameControl || !quantityControl) {
          throw new Error('Form controls not found');
        }

        const menuItem = this.menuItems.find(menuItem => menuItem.name === nameControl.value);
        if (!menuItem) {
          throw new Error(`Menu item not found: ${nameControl.value}`);
        }
        return {
          menuItem,
          quantity: quantityControl.value
        };
      });

      const totalAmount = menuItems.reduce((total, item) => 
        total + (item.menuItem.price * item.quantity), 0);

      const newOrder: Order = {
        id: crypto.randomUUID(),
        customerName: this.orderForm.get('customerName')?.value,
        phoneNumber: this.orderForm.get('phoneNumber')?.value,
        items: menuItems,
        totalAmount,
        date: new Date(),
        orderType: 'Manual'
      };

      console.log('Creating new order:', newOrder);
      this.orderService.addOrder(newOrder);

      // Reset the form
      this.orderForm.reset();
      while (this.items.length) {
        this.items.removeAt(0);
      }
    } else {
      console.log('Form validation errors:', this.orderForm.errors);
      console.log('Customer name errors:', this.orderForm.get('customerName')?.errors);
      console.log('Phone number errors:', this.orderForm.get('phoneNumber')?.errors);
      console.log('Items array length:', this.items.length);
      this.items.controls.forEach((item, index) => {
        console.log(`Item ${index} errors:`, item.errors);
      });
    }
  }
} 