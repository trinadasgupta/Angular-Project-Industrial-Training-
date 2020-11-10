import { Product } from '../models/product';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cartRef = this.db.collection('shopping-carts');

  constructor(private db: AngularFirestore) { }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.cartRef.doc(cartId).collection('items').valueChanges().pipe(
      map(items => items as unknown as ShoppingCartItem[]),
      map(items => new ShoppingCart(items))
    );
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);

  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    (await this.getCart())
    .subscribe(c => c.items
      .forEach(i => this.cartRef.doc(cartId + '/items/' + i.product.id).delete()));

    this.cartRef.doc(cartId).delete();
    localStorage.removeItem('cartId');
  }

  private create() {
    return this.cartRef.add({
      dateCreated: new Date().getTime()
    });
  }


  private getItem(cartId, productId) {
    return this.cartRef.doc(cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }


  private async updateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.id);

    item$.get().pipe(take(1)).subscribe(item => {
      const quantity = (item.exists ? item.data().quantity : 0) + change;
      if (quantity === 0) { item$.delete(); } else {
        item$.set({product, quantity }, {merge: true});
      }
    });

  }
}
