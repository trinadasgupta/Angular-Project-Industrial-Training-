import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {

  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService) {
    this.orders$ = orderService.getAll();
  }

}
