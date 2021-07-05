import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Customer } from 'src/app/_models/customer';
import { CustomerItem } from 'src/app/_models/customer-item';
import { ConsumerService } from 'src/app/_services/consumer.service';


@Component({
  selector: 'app-select-customer-dialog',
  templateUrl: './select-customer-dialog.component.html',
  styleUrls: ['./select-customer-dialog.component.css']
})
export class SelectCustomerDialogComponent implements OnInit {
  displayedColumns: string[] = ['name', 'lastName', 'location', 'phoneNumber'];
  dataSource: MatTableDataSource<CustomerItem>;
  customers: CustomerItem[];
  selectedCustomerId: number;
  selectButtonToggle: boolean;
  selectedCustomer: CustomerItem;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dialog: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {incId: number},
              private consumerService: ConsumerService, private router: Router, private dialogRef: MatDialogRef<SelectCustomerDialogComponent>) { 
    this.selectButtonToggle = true;
  }

  ngOnInit(): void {
    this.consumerService.getConsumers().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSelectedCustomerId(id: number) {
    this.selectedCustomerId = id;
    this.selectButtonToggle = false;
  }

  cancel() {
    // closing itself and sending data to parent component
    this.dialogRef.close({ data: 0 })
  }

  AddCustomer() {
    this.dialogRef.close({ data: this.selectedCustomerId })
  }

}
