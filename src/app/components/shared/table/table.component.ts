import { Component, OnInit, AfterViewInit, OnChanges, ViewEncapsulation, SimpleChanges, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() tableData: any[];
  @Input() tableHeaders;
  @Input() actions;
  @Input() pageSize;
  @Input() title: string;
  @Input() canEdit;
  @Input() canSelect;
  @Input() isHeaderHidden;
  
  @Output() editEvent = new EventEmitter<object>();
  @Output() selectFieldsEvent = new EventEmitter<any[]>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  hasResults = false;
  displayedColumns;
  actionsLocal = false;
  pageSizeOptions = [5, 10, 25, 100];
  // pageSize: number = 5;
  dataSource: MatTableDataSource<any>;

  selection = new SelectionModel<any>(true, []);
  selectedList = [];

  constructor() {}

  ngOnInit(): void {
    this.checkTableData();
    this.dataSource = new MatTableDataSource(this.tableData);
    if (this.actions) {
      this.actionsLocal = this.actions;
    }
  }

  ngAfterViewInit() {
    this.setDataTable(this.tableData);
  }
  edit(object: object) {
    this.editEvent.emit(object);
  }
  selectFields(fields) {
    this.selectFieldsEvent.emit(fields);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.tableData.currentValue);
    
    this.setDataTable(changes.tableData.currentValue);
  }

  setDataTable(updatedTableData) {
    this.displayedColumns = this.tableHeaders.map(x => x.key);
    if (this.actions) {
      this.displayedColumns.push("actions");
    }
    if (this.canSelect) {
      this.displayedColumns.unshift("checkbox");
    }
    this.dataSource = new MatTableDataSource(updatedTableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.checkTableData();
  }
  checkTableData() {
    if (this.tableData.length === 0) {
      this.hasResults = false;
    } else {
      this.hasResults = true;
    }
  }
  // Check if all checkboxes have been selected
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  // Selects all/none (toggles) checkboxes
  masterToggle() {
    this.selectedList = [];
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => {
          this.selection.select(row);
          this.selectedList.push(row);
        });
    this.selectFields(this.selectedList);
  }
  selectRow($event, dataSource) {
    const id = dataSource.Id;
    if ($event.checked) {
      this.selectedList.push(dataSource);
    } else {
      let index = this.selectedList.findIndex(select => {
        return select.Id === id;
      });
      this.selectedList.splice(index, 1);
    }
    this.selectFields(this.selectedList);
  }
}