import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { Book } from 'src/app/shared/book.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor(private service : BookService,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(abm : Book){
    this.service.formData = Object.assign({},abm);
  }

  onDelete(id : number){
    if(confirm("Are you sure you want to delete this entry?")){
      this.service.deleteBook(id).subscribe(res =>{
        this.service.refreshList();
        this.toastr.warning('Deleted successfully!', 'Book Admin.');
      })
    }
  }

}
