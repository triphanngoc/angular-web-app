import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BooksService } from 'src/app/services/BookService';
import { Books } from 'src/app/Models/Book';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-book',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  BookList?: Observable<Books[]>;
  BookList1?: Observable<Books[]>;
  bookForm: any;
  massage = "";
  prodCategory = "";
  Id = 0;
  constructor(private formbulider: FormBuilder,
     private bookService: BooksService,private router: Router,
     private jwtHelper : JwtHelperService,private toastr: ToastrService) { }
  ngOnInit() {
    this.prodCategory = "0";
    this.bookForm = this.formbulider.group({
      bookName: ['', [Validators.required]],
      bookCost: ['', [Validators.required]],
      bookDescription: ['', [Validators.required]],
      bookStock: ['', [Validators.required]]
    });
    this.getBookList();
  }
  getBookList() {
    this.BookList1 = this.bookService.getBookList();
    this.BookList = this.BookList1;
  }
  PostBook(book: Books) {
    const book_Master = this.bookForm.value;
    this.bookService.postBookData(book_Master).subscribe(
      () => {
        this.getBookList();
        this.bookForm.reset();
        this.toastr.success('Data Saved Successfully');
      }
    );
  }
  BookDetailsToEdit(id: string) {
    this.bookService.getBookDetailsById(id).subscribe(bookResult => {
      this.Id = bookResult.Id;
      this.bookForm.controls['BookName'].setValue(bookResult.BookName);      
      this.bookForm.controls['Description'].setValue(bookResult.Description);
      this.bookForm.controls['Author'].setValue(bookResult.Category);
      this.bookForm.controls['Category'].setValue(bookResult.Author);
      this.bookForm.controls['Price'].setValue(bookResult.Price);
    });
  }
  UpdateBook(book: Books) {
    book.Id = this.Id;
    const book_Master = this.bookForm.value;
    this.bookService.updateBook(book_Master).subscribe(() => {
      this.toastr.success('Data Updated Successfully');
      this.bookForm.reset();
      this.getBookList();
    });
  }
  DeleteBook(id: number) {
    if (confirm('Do you want to delete this book?')) {
      this.bookService.deleteBookById(id).subscribe(() => {
        this.toastr.success('Data Deleted Successfully');
        this.getBookList();
      });
    }
  }
  Clear(book: Books){
    this.bookForm.reset();
  }
  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
  }
  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
}