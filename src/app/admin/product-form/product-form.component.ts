import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product = {id: '', title: '', price: 0, category: '', imageUrl: '' };
  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) { productService.get(this.id)
      .pipe(take(1)).subscribe(p => {
        this.product = p;
      });
    }
  }

  ngOnInit(): void {
  }

  save(product) {
    if (this.id) { this.productService.update(this.id, product); } else { this.productService.create(product); }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure to delete this product ?')) { return; }

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
