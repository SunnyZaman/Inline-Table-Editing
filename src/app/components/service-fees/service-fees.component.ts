import { Component, OnInit } from '@angular/core';
import { ServiceFee } from 'src/app/models/service-fee';
import * as serviceData from "src/assets/data/service-data";
import { ServiceEditComponent } from '../shared/dialogs/service-edit/service-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from "rxjs/operators";
import { FormGroup, FormBuilder } from '@angular/forms';
const DEFAULT = 0;
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
  tableData: ServiceFee[];
  feeForm: FormGroup;
  depositOptions = [0.5, 1];
  tableHeaders = [
    {
      key: "ServiceType",
      text: "Service",
      cell: (row: any) => `${row.ServiceType}`
    },
    {
      key: "Cost",
      text: "Cost",
      cell: (row: any) => `${'$' + row.Cost + '/' + row.UnitMeasure}`
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
  zero = 0;
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
    this.tableData = serviceData.default.Data;
    this.feeForm = this.formBuilder.group({
      depositPaid: 0,
      waived: 0,
      depositDue: [{ value: 0, disabled: true }],
      total: [{ value: 0, disabled: true }]
    });

  }

  ngOnInit(): void {
    this.getTotal();
  }
  edit(fee: ServiceFee) {
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
            this.getTotal();
          }
        })
      )
      .subscribe();
  }
  openEditDialog(fee: ServiceFee) {
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
  select(fee: ServiceFee) {

  }
  getTotal() {
    let total = 0;
    this.tableData.map(t => {
      total += t.Total;
    });
    this.feeForm.patchValue({ total: total.toFixed(2) })
  }
  get form() {
    return this.feeForm.controls;
  }
}
