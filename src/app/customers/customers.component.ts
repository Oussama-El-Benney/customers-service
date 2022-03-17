import {Component, OnInit} from '@angular/core';
import {Customer} from "../model/customer.model";
import {CustomersManagerService} from "./customers-manager.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] | undefined

  constructor(private customerService: CustomersManagerService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.customers = this.customerService.getCustomers();
    console.log(this.customers)
  }

  onAddNewCustomer() {
    this.router.navigate(['new'], {relativeTo: this.route})
    console.log('sh')

  }
}
