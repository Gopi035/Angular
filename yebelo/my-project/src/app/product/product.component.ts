import {Component, Inject, OnInit, Pipe, PipeTransform} from '@angular/core';
import Proudct from 'src/app/product/project_list.json';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  animal: string;
  name: string;
}

interface Food {
  value: string;
  viewValue: string;

}

export interface PeriodicElement {
  p_name: string;
  p_id: number;
  p_cost: number;
  p_availability: number;
  p_details: string;
  p_category: string;
  img: string;

}


// const  PeriodicElement[] = Proudct;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  selectedValue: any;
  product: any;
  category: any[] = [];
  // foods: Food[] = [
  //   {value: '', viewValue: 'Premium'},
  //   {value: 'Tamilnadu', viewValue: 'Tamilnadu'},
  //   {value: 'Premium', viewValue: 'Premium'}
  // ];

  constructor(public dialog: MatDialog) {

  }


  ngOnInit(): void {
    this.product = Proudct;

    for (let i = 0; i < Proudct.length; i++) {
      let pCategory = Proudct[i].p_category;
      if (!this.category.includes(pCategory)) {
        this.category.push(pCategory)
      }

    }
  }


  openDialog(): void {

    // let parse = JSON.parse(this.product);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '600px',
      data: this.product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


}

@Pipe({
  name: 'myfilter',
  pure: false
})
export class MyFilterPipe implements PipeTransform {
  transform(product: any[], filter: Object): any {
    if (!product || !filter) {
      return product;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return product.filter(item => item.p_category == filter);
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  jsonData: any;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.jsonData = JSON.stringify(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


