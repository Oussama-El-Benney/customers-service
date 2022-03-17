

export class Customer {
  public name: string;
  public gender: string;
  public location: string;
  public orders: string; //can add order model

  constructor(name: string, gender: string, location: string, orders: string) {
    this.name = name;
    this.gender = gender;
    this.location = location;
    this.orders = orders;
  }
}
