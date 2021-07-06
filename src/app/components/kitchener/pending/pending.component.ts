import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../../../model/order-interface';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { changeStatus } from 'src/app/utilities/changeStatus';
@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit, OnDestroy {
  orderList: Order[] = [];
  filterStatus: Order[] = [];
  total!: number;
  subscriptionOrders: Subscription = new Subscription();

  constructor(private get: OrdersService) { }

  ngOnInit(): void {
    this.orders();
    this.subscriptionOrders = this.get.refresh$.subscribe(() => {
      this.orders();
    });
  }

  ngOnDestroy(): void {
    this.subscriptionOrders.unsubscribe();
    console.log("Observable cerrado");
  }

  orders() {
    this.get.getListOrders().subscribe(data => {
      this.orderList = data;
    }, error => {
      console.log(error);
      alert("Bad Request, rol");
    });
  }
  onChangeStatus(order: Order): void {
    const editOrder = changeStatus(order);
    this.get.updateOrder(editOrder, order._id).subscribe(() => {
      console.log(editOrder);
    }, error => {
      console.log(error);
      alert("Bad Request");
    });

  }
}
