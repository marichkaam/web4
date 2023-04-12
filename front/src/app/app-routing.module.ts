import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ShopComponent } from './shop/shop.component'
import { ItemComponent } from './item/item.component'
import { StoreComponent } from './store/store.component'
import { ItemsInStoreComponent } from './items-in-store/items-in-store.component'

const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'item', component: ItemComponent },
  { path: 'store', component: StoreComponent },
  { path: 'itemsInStore', component: ItemsInStoreComponent },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
