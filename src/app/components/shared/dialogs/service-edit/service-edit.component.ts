import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent implements OnInit {
  serviceFeeForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<ServiceEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.serviceFeeForm = this.formBuilder.group({
      serviceType: [{ value: "", disabled: true }, Validators.required],
      cost: [null, Validators.required],
      unitMeasure: [null, Validators.required],
      quantity: [null, Validators.required],
      total: [{ value: null, disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
  }
  saveFee() {

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
