import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Books } from 'src/app/Models/Book';
import configurl from 'src/assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  url = configurl.apiServer.url + '/api/book/';
  constructor(private http: HttpClient) { }
  getBookList(): Observable<Books[]> {
    return this.http.get<Books[]>(this.url + 'BooksList');
  }
  postBookData(bookData: Books): Observable<Books> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Books>(this.url + 'CreateBook', bookData, httpHeaders);
  }
  updateBook(book: Books): Observable<Books> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Books>(this.url + 'UpdateBook?id=' + book.Id, book, httpHeaders);
  }
  deleteBookById(id: number): Observable<number> {
    return this.http.post<number>(this.url + 'DeleteBook?id=' + id, null);
  }
  getBookDetailsById(id: string): Observable<Books> {
    return this.http.get<Books>(this.url + 'BookDetail?id=' + id);
  }
}