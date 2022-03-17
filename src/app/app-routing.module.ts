import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from "@angular/router";
import {CustomersComponent} from "./customers/customers.component";
import {CustomerComponent} from "./customers/customer/customer.component";
import {AboutComponent} from "./about/about.component";
import {OrdersComponent} from "./orders/orders.component";
import {CustomerEditComponent} from "./customers/customer-edit/customer-edit.component";

const routes: Routes = [
  { path: 'customers', component: CustomersComponent, children:[
      { path: 'new', component: CustomerEditComponent },
      { path: ':id/edit', component: CustomerEditComponent },]},
  { path: 'id', component: CustomerComponent },
  { path: 'about', component: AboutComponent },
  { path: 'orders', component: OrdersComponent },
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
