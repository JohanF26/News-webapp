import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.component.html',
  styleUrls: ['./addnews.component.css']
})
export class AddnewsComponent implements OnInit {

  title: string = '';
  description: string = '';
  url: string = '';
  imageURL: string = '';
  published: string = '';
  errString: string = '';

  constructor(
    private articleService: ArticleService,
    private messengerService: MessengerService,
    private router: Router
  ) { }

  setPublishedDate() {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()
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

  validate() {
    let valid = true;

    if(this.title === ''){
      valid = false;
      this.errString = 'Title Cannot be Blank.'
    }

    if(this.description === ''){
      valid = false;
      this.errString = 'Description Cannot be Blank.'
    }

    if(this.url === ''){
      valid = false;
      this.errString = 'Url Cannot be Blank.'
    }

    if(this.imageURL === ''){
      valid = false;
      this.errString = 'Image Url Cannot be Blank.'
    }

    return valid;
  }

  handleSubmit() {
    if(this.validate()){
      const data = {
        title: this.title,
        description: this.description,
        url: this.url,
        imageUrl: this.imageURL,
        published: this.published
      }
  
      this.articleService.addArticle(data).subscribe(() => {
        this.messengerService.sendMsg({
          type: 'success',
          msg: 'Article Added!'
        });
        this.router.navigate(['/admin/data'])
        this.title = ''
        this.description = ''
        this.url = ''
        this.imageURL = ''
      },
      (err) => this.errString = err.error._message)
    }
  }

  formReset() {
    this.title = ''
    this.description = ''
    this.url = ''
    this.imageURL = ''
    this.published = ''
    this.setPublishedDate()
  }
  

}
