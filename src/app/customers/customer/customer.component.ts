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
  @Input() index: any ;

  constructor(private customerService: CustomersManagerService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  onEditCustomer(index: number) {

    console.log( this.customerService.startedEditing)
    this.router.navigate(['edit'], {relativeTo: this.route, queryParams: {id:index}})
    this.customerService.startedEditing.next(index)
    // this.customerService.editMode = true;
  }
}
