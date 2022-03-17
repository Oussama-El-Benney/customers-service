import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Customer} from "../../model/customer.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomersManagerService} from "../customers-manager.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  // @ts-ignore
  @ViewChild('f', {static: false}) customerForm: NgForm;
  // @ts-ignore
  editMode: boolean;
  // @ts-ignore
  editedCustomerIndex: number;
  // @ts-ignore
  editedCustomer: Customer;
  // @ts-ignore
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private customerService: CustomersManagerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.editedCustomerIndex = +params['id'];
      this.editMode = params['id'] != null;
      this.customerService.startedEditing.next(+params['id'])
    });
    this.subscription = this.customerService.startedEditing.subscribe(() => {
      this.editedCustomer = this.customerService.getCustomer(this.editedCustomerIndex);
      this.customerForm.setValue(
        {
          name: this.editedCustomer.name,
          gender: this.editedCustomer.gender,
          location: this.editedCustomer.location,
          orders: this.editedCustomer.orders,
        }
      )
      console.log(this.customerService.editMode)
      console.log(this.customerForm)
    });
  }


  onSubmit(customerForm: NgForm) {
    console.log(customerForm.value)
    let newCustomer = new Customer(customerForm.value.name, customerForm.value.gender, customerForm.value.location, customerForm.value.orders)
    console.log(newCustomer)
    if (this.editMode) {
      this.customerService.updateCustomer(this.editedCustomerIndex, newCustomer)
    } else {
      this.customerService.addCustomer(newCustomer)
    }
    this.editMode = false;
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/customers'], {relativeTo: this.route});
  }

  onDelete() {
    this.customerService.deleteCustomer(this.editedCustomerIndex);
    this.onCancel();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
