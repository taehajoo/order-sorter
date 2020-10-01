import { Component, ViewEncapsulation } from '@angular/core';
import { ApiService } from './api.service';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment'
import { isEqual, uniqBy, clone } from "lodash";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ccs-app';
  constructor(private apiService: ApiService) {}
  socket:any;

  // this will the the object we interate through
  orders:any = [];

  // this will be the new orders obj we compare the old obj to to weed out duplicates
  newOrders:any = [];

  // search params
  searchObj:any = {};

  // search string
  searchString:any = '';

  // dropdown value
  searchCategory:any = 'Name';

  // dropdown loops through this array to generate select
  categories:any = ['Name', 'ID', 'Address', 'Price', 'Item'];

  // loader
  showLoading:any = true;
  

  ngOnInit() {
    // connected to socketio endpoint
    this.apiService.setupSocketConnection();
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('order_event', (data: string) => {
      this.showLoading = false;
      for (let incomingOrder of data) {
        // add incoming order to newOrders array
        this.newOrders.push(incomingOrder);
        // check if the new order is unqiue by checking ID 
        if (isEqual(this.orders, uniqBy(this.newOrders, 'id'))) {
          // if there was a duplicate, we don't want this new order, so we will keep the old order array.
          this.newOrders = clone(this.orders);
        } else {
          // if there was no duplicate, the newOrders array which now contains the new order overwrites the old one.
          this.orders = clone(this.newOrders);
        }
      }
    });
  }

  selectCategory () {
    // just to clean out inputs when swapping catergory
    this.searchObj = {};
    this.searchString = '';
  }

  inputChange (input) {
    // set the filter params and pass in the input value to it.
    if (this.searchCategory === 'Name') {
      this.searchObj.name = input;
    } else if (this.searchCategory === 'ID') {
      this.searchObj.id = input;
    } else if (this.searchCategory === 'Address') {
      this.searchObj.address = input;
    } else if (this.searchCategory === 'Price') {
      this.searchObj.price = input;
    } else if (this.searchCategory === 'Item') {
      this.searchObj.menuItem = input;
    }
  }
}
