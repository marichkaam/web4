import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { addShop, Shop } from '../model_shop'
import { HttpClient } from '@angular/common/http'
import { domain } from '../prefs'

declare var window: any

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent {
  baseData = { name: '', address: '', capacity: 10 }
  shopData: any[] = []
  newData: any = this.baseData
  updateId: string = ''

  constructor(private http: HttpClient) {
    this.getShopApi()
  }

  getShopApi() {
    this.http.get(`${domain}/shop/list`).subscribe((res: any) => {
      this.shopData = res
      // console.log(res)
    })
  }

  postAddShopApi() {
    if (
      this.newData.name !== '' &&
      this.newData.address !== '' &&
      parseInt(this.newData.capacity) > 0
    )
      this.http
        .post(`${domain}/shop/add`, this.newData)
        .subscribe((res: any) => {
          // console.log(res)
          window.location.reload()
        })
  }
  postDeleteShopApi(id: string) {
    this.http.post(`${domain}/shop/remove/${id}`, {}).subscribe((res: any) => {
      // console.log(`deleted: ${res}`)
      window.location.reload()
    })
  }
  postUpdateShopApi() {
    this.http
      .post(`${domain}/shop/edit/${this.updateId}`, this.newData)
      .subscribe((res: any) => {
        // console.log(`deleted: ${res}`)
        window.location.reload()
      })
  }

  // -------------------------------------------

  formModal: any
  formModal_update: any
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('staticBackdrop'),
    )
    this.formModal_update = new window.bootstrap.Modal(
      document.getElementById('staticBackdrop_update'),
    )
  }
  openModal() {
    this.newData = this.baseData
    this.formModal.show()
  }
  openModal_Update(el: any) {
    this.newData = this.baseData
    this.updateId = el._id
    this.newData = { name: el.name, address: el.address, capacity: el.capacity }

    this.formModal_update.show()
  }
  closeModal() {
    this.formModal.hide()
  }
  closeModal_Update() {
    this.formModal_update.hide()
  }
}
