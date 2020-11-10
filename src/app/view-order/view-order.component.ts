import { take } from 'rxjs/operators';
import { OrderService } from './../services/order.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent {
  order = new Order('', '', new ShoppingCart([]));
  previous: string;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    const isAdmin = this.route.snapshot.paramMap.get('isAdmin');
    this.previous = isAdmin === 'true' ? '/admin/orders' : '/my/orders';

    if (id) { orderService.getOrder(id)
    .pipe(take(1)).subscribe(o => this.order = o);
    }

  }
}
