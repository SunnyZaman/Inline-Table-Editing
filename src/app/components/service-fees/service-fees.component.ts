import { Component, OnInit } from '@angular/core';
import { ServiceFee } from 'src/app/models/service-fee';
import * as serviceData from "src/assets/data/service-data";
import { ServiceEditComponent } from '../shared/dialogs/service-edit/service-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from "rxjs/operators";

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
      cell: (row: any) => `${'$'+row.Cost +'/'+row.UnitMeasure}`
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
  constructor(
    public dialog: MatDialog,
  ) {
    this.tableData = serviceData.default.Data;
   }

  ngOnInit(): void {
  }
  edit(fee:ServiceFee){
    this.openEditDialog(fee)
    .pipe(
      map((result: ServiceFee) => {
        if (result !== null) {
          console.log("result: ", result);
            const index = this.tableData.findIndex(
              x => x.Id === result.Id
            );
            this.tableData[index] = result;
            console.log(this.tableData);
            this.tableData = [...this.tableData];
          }
      })
    )
    .subscribe();
  }
  openEditDialog(fee:ServiceFee){
  const title = "Edit Service Fee";
  const saveLabel = "Save";
  const dialogRef = this.dialog.open(ServiceEditComponent, {
    width: "95%",
    disableClose: true,
    data: {
      feeObj: fee,
      title: title,
      saveLabel: saveLabel
    }
  });
  return dialogRef.afterClosed().pipe(map(res => res));
}
  select(fee:ServiceFee){
    
  }
}
