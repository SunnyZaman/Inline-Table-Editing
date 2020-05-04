import { Component, OnInit, Inject, ViewEncapsulation, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as dropdownData from "src/assets/data/dropdown-data";
import { ServiceFee } from 'src/app/models/service-fee';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ServiceEditComponent implements OnInit, AfterViewInit {
  serviceFeeForm: FormGroup;
  dropdowns: boolean;
  costDropdown = [];
  unitMeasureDropdown = [];
  dropdownData = [];
  constructor(
    private dialogRef: MatDialogRef<ServiceEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef
  ) {
    this.dropdownData = dropdownData.default.Data;
    this.serviceFeeForm = this.formBuilder.group({
      serviceType: [{ value: "", disabled: true }, Validators.required],
      cost: [null, Validators.required],
      unitMeasure: [null, Validators.required],
      quantity: [null, Validators.required],
      total: [{ value: null, disabled: true }, Validators.required]
    });
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.intializeData();
  }

  intializeData() {
    const serviceFee = this.data.feeObj;
    console.log(serviceFee);
    console.log(this.dropdownData);
    console.log(this.dropdownData.findIndex(x => x.ServiceType === serviceFee.ServiceType));

    const index = this.dropdownData.findIndex(x => x.ServiceType === serviceFee.ServiceType);
    if (index !== -1) {
      console.log("found");
      this.dropdowns = true;
      this.costDropdown = this.dropdownData[index].Cost.Options;
      this.unitMeasureDropdown = this.dropdownData[index].UnitMeasure.Options;
    }

    this.serviceFeeForm.patchValue({
      serviceType: serviceFee.ServiceType,
      cost: serviceFee.Cost,
      unitMeasure: serviceFee.UnitMeasure,
      quantity: serviceFee.Quantity,
      total: serviceFee.Total
    });
  }
  selectChange(event, value) {
    let result = event.value;
    console.log(result);
    let index = 0;
    switch (value) {
      case "cost":
        this.updateTotal(result, value);
        index = this.costDropdown.findIndex(x => x === result);
        console.log(index);
        this.serviceFeeForm.patchValue({ unitMeasure: this.unitMeasureDropdown[index] });
        break;
      case "unitMeasure":
        index = this.unitMeasureDropdown.findIndex(x => x === result);
        console.log(index);
        this.serviceFeeForm.patchValue({ cost: this.costDropdown[index] });
        break;
      default:
        break;
    }
  }
  saveFee() {
    const id = this.data.feeObj.Id;
    const status = new ServiceFee(
      id,
      this.form.serviceType.value,
      this.form.cost.value,
      this.form.unitMeasure.value,
      this.form.quantity.value,
      this.form.total.value,
    );
    this.dialogRef.close(status);
  }
  updateTotal(event, input){
    const value = event.target!==undefined ? event.target.value.trim() : event;
    this.serviceFeeForm.get(input).setValue(value);
    const cost = this.form.cost.value;
    const quantity = this.form.quantity.value;
    this.serviceFeeForm.patchValue({total: cost*quantity})
  }
  close() {
    this.dialogRef.close(null);
  }
  invalidStatus() {
    return !this.serviceFeeForm.valid
  }
  get form() {
    return this.serviceFeeForm.controls;
  }
}
