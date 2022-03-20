import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Customer} from "../../model/customer.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CustomersManagerService} from "../customers-manager.service";
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  // @ts-ignore
  // @ViewChild('f', {static: false}) customerForm: NgForm;
  customerName = '';
  customerLocation = '';
  customerGender = '';
  customerOrders = '';
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
              private router: Router,
              private http: HttpClient) {
  }

  ngOnInit(): void {

    // this.editedCustomerIndex = this.route.snapshot.queryParams['id']
    // this.editMode = this.editedCustomerIndex != null;
    // this.editedCustomer = this.customerService.getCustomer(this.editedCustomerIndex);
    // this.customerName = this.editedCustomer.name;
    // this.customerGender = this.editedCustomer.gender;
    // this.customerLocation = this.editedCustomer.location;
    // this.customerOrders = this.editedCustomer.orders;


    this.route.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.editedCustomerIndex = this.route.snapshot.queryParams['id']
          this.editMode = this.editedCustomerIndex != null;
          this.editedCustomer = this.customerService.getCustomer(this.editedCustomerIndex);
          this.customerName = this.editedCustomer.name;
          this.customerGender = this.editedCustomer.gender;
          this.customerLocation = this.editedCustomer.location;
          this.customerOrders = this.editedCustomer.orders;
        }
      );

    // this.subscription = this.customerService.startedEditing.subscribe(index => {
    //   console.log(index)
    //   this.editedCustomer = this.customerService.getCustomer(index);
    //   this.customerForm.setValue(
    //     {
    //       name: this.editedCustomer.name,
    //       gender: this.editedCustomer.gender,
    //       location: this.editedCustomer.location,
    //       orders: this.editedCustomer.orders,
    //     }
    //   )
    //   console.log(this.customerService.editMode)
    //   console.log(this.customerForm)
    // });
  }


  onSubmit(customerForm: NgForm) {
    let newCustomer = new Customer(customerForm.value.name, customerForm.value.gender, customerForm.value.location, customerForm.value.orders)
    console.log(newCustomer)
    if (this.editMode) {
      this.customerService.updateCustomer(this.editedCustomerIndex, newCustomer)
    } else {
      this.customerService.addCustomer(newCustomer)
    }
    this.http.post('https://customers-service-48899-default-rtdb.firebaseio.com/customers.json',
      this.customerService.getCustomers()).subscribe(
      responseData => {
        console.log(responseData);
      }
    );
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

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
