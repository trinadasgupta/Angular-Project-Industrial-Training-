import { map } from 'rxjs/operators';
import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore, private cartService: ShoppingCartService) { }

  async placeOrder(order: Order) {
    const result = await this.db.collection<Order>('orders').add({...order});
    this.cartService.clearCart();
    return result;
  }

  getAll() {
    return this.db.collection<Order>('orders').valueChanges({idField: 'id'});
  }

  getAllByUserId(userId: string) {
    return this.db.collection<Order>('orders', ref => ref.where('userId', '==', userId)).valueChanges({idField: 'id'});
  }

  getOrder(orderId) {
    return this.db.collection<Order>('orders').doc(orderId).get().pipe(
      map(o => o.data() as Order)
    );
  }
}
