import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppUser } from '../models/app-user';
import { AuthService } from './../services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService, private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.auth.appUsers$.subscribe(user => this.appUser = user);

    setTimeout(async () => {
      this.cart$ = await this.cartService.getCart();
    }, 1000);
  }

  logout() {
    this.isCollapsed = true;
    this.auth.logout();
  }

  reloadNavBar() {
    this.isCollapsed = !this.isCollapsed;
    setTimeout(async () => {
      this.cart$ = await this.cartService.getCart();
    }, 1000);
  }


}
