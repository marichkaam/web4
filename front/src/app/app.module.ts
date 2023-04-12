import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { HeaderComponent } from './header/header.component';
import { ItemComponent } from './item/item.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreComponent } from './store/store.component';
import { ItemsInStoreComponent } from './items-in-store/items-in-store.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    HeaderComponent,
    ItemComponent,
    StoreComponent,
    ItemsInStoreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
