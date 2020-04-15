import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-editnews',
  templateUrl: './editnews.component.html',
  styleUrls: ['./editnews.component.css']
})
export class EditnewsComponent implements OnInit {

  @Input() article: Article;
  published: string = '';

  constructor() { }

  setPublishedDate() {
    let articleDate = new Date(this.article.published)
    let year = articleDate.getFullYear()
    let month = articleDate.getMonth() + 1
    let day = articleDate.getDate()
    this.published += year + '-'
    if(month < 10){
      this.published += '0'
    }
    this.published += month + '-'
    if(day < 10){
      this.published += '0'
    }
    this.published += day
  }

  ngOnInit(): void {
    this.setPublishedDate()
  }

}
