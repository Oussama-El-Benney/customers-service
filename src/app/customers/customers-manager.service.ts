import {Injectable} from '@angular/core';
import {Customer} from "../model/customer.model";
import {Subject} from "rxjs";

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

  constructor() {
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
  deleteCustomer(index : number) {
    this.customers.splice(index,1);
    console.log(this.customers)
    this.customersChanged.next(this.customers.slice());
  }
}
