import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private service : BookService,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if (form!=null)
      form.resetForm();
    this.service.formData = {
      BookID: null,
      Title: '',
      Author: '',
      Editorial: ''
    }
  }

  onSubmit(form : NgForm){
    if(form.value.BookID == null)
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }

  insertRecord(form : NgForm){
    this.service.postBook(form.value).subscribe(res => {
      this.toastr.success('Added successfully!', 'Book Admin.');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form : NgForm){
    this.service.putBook(form.value).subscribe(res => {
      this.toastr.info('Updated successfully!', 'Book Admin.');
      this.resetForm(form);
      this.service.refreshList();
    });
  }
}
