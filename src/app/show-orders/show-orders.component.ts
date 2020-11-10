import { Component, Input } from '@angular/core';
import { Order } from '../models/order';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('orders') orders: Order[];
  // tslint:disable-next-line:no-input-rename
  @Input('is-admin') isAdmin: boolean;

}
