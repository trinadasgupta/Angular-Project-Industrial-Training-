import { Product } from '../models/product';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsRef = this.db.collection('products');

  constructor(private db: AngularFirestore) { }

  create(product) {
    return this.productsRef.add(product);
  }

  getAll() {
    return this.productsRef.valueChanges({ idField: 'id' }).pipe(
      map(p => p as unknown[] as Product[])
    );
  }

  get(productId) {
    return this.productsRef.doc(productId).get().pipe(
      map(p => p.data() as Product)
    );
  }

  update(productId, product) {
    return this.productsRef.doc(productId).update(product);
  }

  delete(productId) {
    return this.productsRef.doc(productId).delete();
  }
}
