import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public showCart = false;

  constructor() { }

  ngOnInit() {
  }

  public toggleCart(): void {
    this.showCart = !this.showCart;
  }
}
