import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="header-content">
        <img src="/assets/images/corndog-logo.png" alt="Corndog Company Logo" class="logo">
        <h1 class="title">The Corndog Company</h1>
        <img src="/assets/images/food-truck.jpg" alt="Food Truck" class="truck-image">
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: white;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
      position: relative;
      width: 100%;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      height: 50px;
      width: auto;
    }

    .title {
      margin: 0;
      color: #333;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    .truck-image {
      height: 50px;
      width: auto;
    }
  `]
})
export class HeaderComponent {} 