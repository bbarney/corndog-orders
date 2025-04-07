import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItems: MenuItem[] = [
    {
      id: 'epic',
      name: 'Epic',
      description: 'Footlong, all beef corndog',
      price: 8.00
    },
    {
      id: 'mini',
      name: 'Mini',
      description: 'Regular sized corndog',
      price: 6.00
    },
    {
      id: 'smokey-cheddar',
      name: 'Smokey Cheddar',
      description: 'Pork sausage with cheddar cheese',
      price: 7.00
    },
    {
      id: 'cheese-bomb',
      name: 'Cheese Bomb',
      description: 'Choice of Mozzarella, cheddar or pepperjack',
      price: 5.00
    },
    {
      id: 'drink',
      name: 'Drinks',
      description: 'Choice of Water, Coke and Pepsi products or Guarana Atartica',
      price: 2.00
    }
  ];

  getMenuItems(): Observable<MenuItem[]> {
    return of(this.menuItems);
  }
} 