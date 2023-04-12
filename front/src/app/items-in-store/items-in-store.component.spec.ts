import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsInStoreComponent } from './items-in-store.component';

describe('ItemsInStoreComponent', () => {
  let component: ItemsInStoreComponent;
  let fixture: ComponentFixture<ItemsInStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsInStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsInStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
