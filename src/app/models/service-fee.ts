export class ServiceFee {
    Id: number;
    ServiceType: string; //Application, Reproduction, Shipping
    Cost: number;
    UnitMeasure: string;
    Quantity: number;
    Total: number;
    constructor(options?: Partial<ServiceFee>) {
      Object.assign(this, options);
    }
  }
  