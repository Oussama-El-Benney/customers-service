import {Component, OnInit} from '@angular/core';
import {Customer} from "../shared/customer.model";
import {CustomersManagerService} from "./customers-manager.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] | undefined
  viewMode : number =0;
  // @ts-ignore
  subscription: Subscription;
  constructor(private customerService: CustomersManagerService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {

    this.customers = this.customerService.getCustomers();
    console.log(this.customers)
    this.subscription = this.customerService.customersChanged.subscribe(()=> {
      console.log("shesj")
      this.customers = this.customerService.getCustomers();
    });
  }

  onAddNewCustomer() {
    this.router.navigate(['new'], {relativeTo: this.route})
    console.log('sh')
  }
}
