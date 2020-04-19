import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeToCartComponent } from './add-recipe-to-cart.component';

describe('AddRecipeToCartComponent', () => {
  let component: AddRecipeToCartComponent;
  let fixture: ComponentFixture<AddRecipeToCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecipeToCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecipeToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
