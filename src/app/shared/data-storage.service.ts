import { Injectable } from '@angular/core';
import {CustomersManagerService} from "../customers/customers-manager.service";
import {HttpClient} from "@angular/common/http";
import {Customer} from "./customer.model";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private customerService: CustomersManagerService,
              private http : HttpClient) { }

  storeCustomers() {
    const customers = this.customerService.getCustomers();
    this.http
      .put(
        'https://customers-service-48899-default-rtdb.firebaseio.com/customers.json',
        customers
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchCustomers() {
    return this.http
      .get<Customer[]>(
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json'
      )
      .pipe(
        map(customers => {
          return customers.map(customer => {
            return {
              ...customer,
            };
          });
        }),
        tap(customers => {
          this.customerService.setCustomers(customers);
        })
      )
  }

  deleteCustomers() {
    return this.http
      .delete(
        'https://customers-service-48899-default-rtdb.firebaseio.com/customers.json'
      )
      .subscribe(response => {
        console.log(response);
      });
  }
}
