import {Component, Input, OnInit} from '@angular/core';
import {Customer} from "../../model/customer.model";
import {CustomersManagerService} from "../customers-manager.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  // @ts-ignore
  @Input() customer: Customer;
  @Input() index: any;

  constructor(private customerService: CustomersManagerService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log("s")
  }

  onEditCustomer(index: number) {
    this.router.navigate([this.index, 'edit'], {relativeTo: this.route})
    this.customerService.editMode = true;
    this.customerService.startedEditing.next(index)
  }
}
