import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Article } from '../models/article'
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:3000/articles'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getHttpOptions() {
    if(localStorage.getItem('userObj')){
      const httpOptions = {
        headers: new HttpHeaders({
          'Authentication': 'Token ' + JSON.parse(localStorage.getItem('userObj')).token
        })
      }
      return httpOptions
    }
  }

  getSingleArticle(id): Observable<Article> {
    return this.http.get<Article>(apiUrl + '/' + id, this.getHttpOptions())
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(apiUrl, this.getHttpOptions())
  }

  addArticle(data: any) {
    return this.http.post(apiUrl, data, this.getHttpOptions())
  }

  updateArticle(data: any) {
    return this.http.put(apiUrl + '/' + data._id, data, this.getHttpOptions())
  }

  deleteArticle(id) {
    return this.http.delete(apiUrl + '/' + id, this.getHttpOptions())
  }


}
