import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';


export class ShoppingCart {
    dateCreated: number;
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: ShoppingCartItem[]) {
        itemsMap.forEach(i => this.items.push(new ShoppingCartItem(i.product, i.quantity)));
    }

    get totalItemsCount() {
        let count = 0;
        this.items.forEach(item => count += item.quantity);
        return count;
    }

    get totalPrice() {
        let sum = 0;
        this.items.forEach(item => sum += item.totalPrice);

        return sum;
    }

    getQuantity(product: Product) {
        const item = this.itemsMap
                  .filter(i => i.product.id === product.id)
                  .map(i => i.quantity);
        return item ? item[0] : 0;
      }
}
