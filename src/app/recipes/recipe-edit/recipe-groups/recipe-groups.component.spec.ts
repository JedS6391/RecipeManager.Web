import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeGroupsComponent } from './recipe-groups.component';

describe('RecipeGroupsComponent', () => {
  let component: RecipeGroupsComponent;
  let fixture: ComponentFixture<RecipeGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
