import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, OrderFormComponent, OrdersListComponent],
  template: `
    <div class="app-container">
      <app-order-form></app-order-form>
      <app-orders-list></app-orders-list>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
  `]
})
export class AppComponent {
  title = 'corndog-orders';
}
