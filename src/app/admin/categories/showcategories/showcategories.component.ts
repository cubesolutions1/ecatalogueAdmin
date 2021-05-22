import { DatatableComponent } from '@swimlane/ngx-datatable/release';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/shared/services/Api.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var require: any;
const data: any = require('../../../shared/data/company.json');
@Component({
  selector: 'app-showcategories',
  templateUrl: './showcategories.component.html',
  styleUrls: ['./showcategories.component.scss']
})
export class ShowcategoriesComponent implements OnInit {
  editing = {};
  items = [
    {name: 'Apple', type: 'fruit'},
    {name: 'Carrot', type: 'vegetable'},
    {name: 'Orange', type: 'fruit'}];
  categories: any = []
  apiUrl: string
  page = 1
  limit = 5
  pageSize = 10;
  rows = []
  temp = [];
  columns = [
    { prop: 'name' },
    { name: 'Company' },
    { name: 'Gender' },
    { name: 'Actions' }
  ];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(private apiSer: ApiService,
    private route: Router) {
    // this.rows = data;
    // this.temp = [...data];

    this.apiUrl = environment.apiImg
    //

  }

  ngOnInit(): void {
    this.getcategories()

  }

  onItemDrop(e: any) {
    // Get the dropped data here
    // this.droppedItems.push(e.dragData);
    console.log(e)
}
  public getcategories() {
    return new Promise(resolve => {



      this.categories = []
      this.rows = []
      return this.apiSer.getData('categories/?sort=ordre').subscribe((res: any) => {

        this.categories = res.data
        this.rows = res.data
        this.temp = [...this.rows]

        resolve(this.categories)
        resolve(this.rows)

      })
    })
  }
  onchange(event) {
    return new Promise(resolve => {
      // this.page = 0
      //
      // this.page = event.target.parentElement.innerText
      //
      return this.apiSer.getData('categories/?sort=-ordre').subscribe((res: any) => {

        this.categories = res.data

        resolve(this.categories)

      })
    })
  }
  // And the listener code which asks the DataSource to filter the data:


  //  For confirm action On Delete
  onDeleteConfirm(event) {
    swal.fire({
      title: 'êtes vous Sûre?',
      text: 'Vous ne pouvez pas restaurer vos données!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmer'
    }).then((result) => {
      if (result.value) {
        return this.apiSer.delete('categories/', event).subscribe((res: any) => {


          this.getcategories();


          swal.fire(
            'Supprimé!',
            'L\'opération a été effectuée avec succès!',
            'success'
          )
        }, err => {



        })
      }


    })

  }


  //  For confirm action On Save
  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  //  For confirm action On Create
  onCreateConfirm() {
    // if (window.confirm('Are you sure you want to create?')) {
    //     event.newData['name'] += ' + added in code';
    //     event.confirm.resolve(event.newData);
    // } else {
    //     event.confirm.reject();
    // }
    this.route.navigateByUrl('/responsable/add')
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  updateValue(event, cell, rowIndex, id) {

    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];

    const body = {
      ordre: event.target.value
    }
    return this.apiSer.patchData('categories/updateOrdre/', body, id).subscribe((res: any) => {

this.getcategories()

    })
  }
}
