import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  formData : Book;
  list : Book[];
  readonly rootURL = "https://localhost:44324/api"

  constructor(private http : HttpClient) { }

  postBook(formData : Book){
    return this.http.post(this.rootURL + '/Book', formData);
  }

  refreshList(){
    this.http.get(this.rootURL + '/Book')
    .toPromise().then(res => this.list = res as Book[]);
  }

  putBook(formData : Book){
    return this.http.put(this.rootURL + '/Book/' + formData.BookID, formData);
  }

  deleteBook(id : number){
    return this.http.delete(this.rootURL + '/Book/' + id);
  }
}
