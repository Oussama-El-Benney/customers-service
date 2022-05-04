import {Injectable} from '@angular/core';
import {Customer} from "../shared/customer.model";
import {map, Subject, tap} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomersManagerService {
  customersChanged = new Subject<Customer[]>();
  startedEditing = new Subject<number>();

  // @ts-ignore
  editMode : boolean;
  private customers: Customer[] = [
    new Customer("Oussama", "male", "maamoura", "nothing"),
    new Customer("Hazem", "male", "pensylvinia", "nothing"),
    new Customer("Sirat", "female", "sheeesh,california", "nothing"),
    new Customer("Adamski bish", "male", "arizona", "nothing"),
    new Customer("tina", "female", "york new", "nothing"),
    new Customer("igor ma boy", "male", "osaka", "nothing"),
    new Customer("brad blueee", "female", "laughtale", "nothing"),
    new Customer("heedy weedy", "male", "kyoto", "nothing"),
    new Customer("john papaa", "female", "kagoshima", "nothing"),
    new Customer("sheeeeesh", "male", "saitama", "nothing"),
  ]

  constructor(private http : HttpClient) {
  }
  setCustomers(customers: Customer[]) {
    this.customers = customers;
    this.customersChanged.next(this.customers.slice());
  }
  getCustomers() {
    return this.customers.slice();
  }

  getCustomer(index: number) {
    return this.customers[index];
  }
  addCustomer(customer: Customer) {
    this.customers.push(customer);
    console.log(this.customers)
    this.customersChanged.next(this.customers.slice());
    // this.dataStorage.storeCustomers();
  }
  addCustomers(customers: Customer[]) {
    // @ts-ignore
    this.customers.push(customers);
    console.log(this.customers)
    this.customersChanged.next(this.customers.slice());
  }
  updateCustomer(index : number, newCustomer: Customer) {
    this.customers.splice(index,1, newCustomer)
    console.log(this.customers)
    this.customersChanged.next(this.customers.slice());
  }
  // deleteCustomer(index : number) {
  //   this.customers.splice(index,1);
  //   console.log(this.customers)
  //   this.customersChanged.next(this.customers.slice());
  // }

  storeCustomers() {
    const customers = this.getCustomers();
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
          this.setCustomers(customers);
        })
      )
  }

  deleteCustomer(index : number) {
    this.customers.splice(index,1);
    console.log(this.customers)
    this.customersChanged.next(this.customers.slice());
    return this.http
      .delete(
        `https://customers-service-48899-default-rtdb.firebaseio.com/customers.json/${index}`
      )
      .subscribe(response => {
        console.log(response);
      });
  }
}
