import { TestBed } from '@angular/core/testing';
import { MenuService } from './menu.service';
import { MenuItem } from '../models/menu-item.model';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService]
    });
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return menu items', (done) => {
    service.getMenuItems().subscribe(items => {
      expect(items).toBeDefined();
      expect(items.length).toBeGreaterThan(0);
      const firstItem = items[0];
      expect(firstItem.id).toBeDefined();
      expect(firstItem.name).toBeDefined();
      expect(firstItem.description).toBeDefined();
      expect(firstItem.price).toBeDefined();
      done();
    });
  });

  it('should return specific menu items', (done) => {
    service.getMenuItems().subscribe(items => {
      const epicItem = items.find(item => item.id === 'epic');
      expect(epicItem).toBeDefined();
      expect(epicItem?.name).toBe('Epic');
      expect(epicItem?.description).toBe('Footlong, all beef corndog');
      expect(epicItem?.price).toBe(8.00);

      const miniItem = items.find(item => item.id === 'mini');
      expect(miniItem).toBeDefined();
      expect(miniItem?.name).toBe('Mini');
      expect(miniItem?.description).toBe('Regular sized corndog');
      expect(miniItem?.price).toBe(6.00);
      done();
    });
  });

  it('should return all menu items', (done) => {
    service.getMenuItems().subscribe(items => {
      expect(items.length).toBe(5);
      expect(items.map(item => item.id)).toEqual([
        'epic',
        'mini',
        'smokey-cheddar',
        'cheese-bomb',
        'drink'
      ]);
      done();
    });
  });
}); 