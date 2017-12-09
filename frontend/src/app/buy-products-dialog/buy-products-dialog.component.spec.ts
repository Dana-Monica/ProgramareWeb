import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProductsDialogComponent } from './buy-products-dialog.component';

describe('BuyProductsDialogComponent', () => {
  let component: BuyProductsDialogComponent;
  let fixture: ComponentFixture<BuyProductsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyProductsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyProductsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
