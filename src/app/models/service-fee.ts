export class ServiceFee {
  Id: number;
  ServiceType: string; //Application, Reproduction, Shipping
  Cost: number;
  UnitMeasure: string;
  Quantity: number;
  Total: number;
  constructor(
    id: number,
    serviceType: string,
    cost: number,
    unitMeasure: string,
    quantity: number,
    total: number,
  ) {
    this.Id = id;
    this.ServiceType = serviceType;
    this.Cost = cost;
    this.UnitMeasure = unitMeasure;
    this.Quantity = quantity;
    this.Total = total;
  }

}
