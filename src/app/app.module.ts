import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';

// Firebase Modules

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

// Components
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/home.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShowOrdersComponent } from './show-orders/show-orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';

// Services
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';


// import {  } from '';

@NgModule({
  declarations: [
    AppComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent,
    NavbarComponent,
    LoginComponent,
    ShoppingCartComponent,
    HomeComponent,
    CheckOutComponent,
    MyOrdersComponent,
    NotFoundComponent,
    OrderSuccessComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ProductsComponent,
    ShoppingCartSummaryComponent,
    ShowOrdersComponent,
    ViewOrderComponent,
    ProductFilterComponent,
    ShippingFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [
    AdminAuthGuardService,
    AuthGuardService,
    AuthService,
    CategoryService,
    OrderService,
    ProductService,
    ShoppingCartService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
