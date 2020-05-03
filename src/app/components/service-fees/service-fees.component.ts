import { Component, OnInit } from '@angular/core';
import { ServiceFee } from 'src/app/models/service-fee';

@Component({
  selector: 'app-service-fees',
  templateUrl: './service-fees.component.html',
  styleUrls: ['./service-fees.component.scss']
})
export class ServiceFeesComponent implements OnInit {
  tableData:ServiceFee[];
  tableHeaders;
  constructor() { }

  ngOnInit(): void {
  }
  edit(fee:ServiceFee){

  }
  select(fee:ServiceFee){
    
  }
}
