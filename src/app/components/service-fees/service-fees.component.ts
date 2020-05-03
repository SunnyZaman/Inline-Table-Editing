import { Component, OnInit } from '@angular/core';
import { ServiceFee } from 'src/app/models/service-fee';
import * as serviceData from "src/assets/service-data";

@Component({
  selector: 'app-service-fees',
  templateUrl: './service-fees.component.html',
  styleUrls: ['./service-fees.component.scss']
})
export class ServiceFeesComponent implements OnInit {
  formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  });
  tableData:ServiceFee[];
  tableHeaders = [
    {
      key: "ServiceType",
      text: "Service",
      cell: (row: any) => `${row.ServiceType}`
    },
    {
      key: "Cost",
      text: "Cost",
      cell: (row: any) => `${row.Cost}`
    },
    {
      key: "Quantity",
      text: "Quantity",
      cell: (row: any) => `${row.Quantity}`
    },
    {
      key: "Total",
      text: "Total",
      cell: (row: any) => `${this.formatter.format(row.Total)}`
    }
  ];
  constructor() {
    this.tableData = serviceData.default.Data;
   }

  ngOnInit(): void {
  }
  edit(fee:ServiceFee){

  }
  select(fee:ServiceFee){
    
  }
}
