import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { domain } from '../prefs'

declare var window: any

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  baseData = { name: '', contry: '' }
  itemData: any[] = []
  newData: any = this.baseData
  updateId: string = ''

  constructor(private http: HttpClient) {
    this.getItemApi()
  }

  getItemApi() {
    this.http.get(`${domain}/item/list`).subscribe((res: any) => {
      this.itemData = res
      // console.log(res)
    })
  }

  postAddItemApi() {
    if (
      this.newData.name !== '' &&
      this.newData.contry !== ''
    )
      this.http
        .post(`${domain}/item/add`, this.newData)
        .subscribe((res: any) => {
          // console.log(res)
          window.location.reload()
        })
  }
  postDeleteItemApi(id: string) {
    this.http.post(`${domain}/item/remove/${id}`, {}).subscribe((res: any) => {
      // console.log(`deleted: ${res}`)
      window.location.reload()
    })
  }
  postUpdateItemApi() {
    this.http
      .post(`${domain}/item/edit/${this.updateId}`, this.newData)
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
    this.newData = { name: el.name, contry: el.contry }

    this.formModal_update.show()
  }
  closeModal() {
    this.formModal.hide()
  }
  closeModal_Update() {
    this.formModal_update.hide()
  }
}
