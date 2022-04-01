import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service'


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  Books: any = [];
  searchForm: FormGroup;

  constructor(
    private crudService: CrudService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formSearchInit();
    this.getBooks();
  }

  formSearchInit() {
    this.searchForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: [''],
    })
  }

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Do you want to go ahead')) {
      this.crudService.deleteBook(id).subscribe((res) => {
        // Remove an item from n index
        this.Books.splice(i, 1);
        // เปลี่ยนลบเสร็จต้องโหลดดาต้ามาใหม่
      })
    }
  }

  onSearch() {
    this.getBooks();
  }

  onReset() {
    this.formSearchInit();
  }
  
  getBooks() {
    this.crudService.GetBooks(this.searchForm.value).subscribe(res => {
      console.log(res);
      this.Books = res;
    })
  }

}
