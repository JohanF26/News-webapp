import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import { Router } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit, AfterViewInit {

  articles: Article[] = []
  editArticle;
  idToDelete;
  published: string = ''
  query: string = '';
  errString: string = ''

  constructor(
    private articleService: ArticleService,
    private messengerService: MessengerService,
    private router: Router
  ) { }

  setArticleToEdit(article: Article){
    this.editArticle = Object.assign({}, article)
    this.setPublishedDate(article.published.toString())
  }

  setIdToDelete(id){
    this.idToDelete = id
  }
  
  setPublishedDate(someDate: string) {
    this.published = ''
    let articleDate = new Date(someDate)
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

  loadArticles() {
    this.editArticle = {
      _id: '',
      title: '',
      description: '',
      url: '',
      imageUrl: '',
      published: ''
    }
    this.idToDelete = ''
    this.articleService.getArticles().subscribe((values: Article[]) => {
      this.articles = values;
    })
  }

  ngOnInit(): void {
    this.loadArticles()
    this.messengerService.getMsg().subscribe(() => {
      this.loadArticles(); //event trigger from messenger service
    })
  }

  validate() {
    let valid = true;

    if(this.editArticle.title === ''){
      valid = false;
      this.errString = 'Title Cannot be Blank.'
    }

    if(this.editArticle.description === ''){
      valid = false;
      this.errString = 'Description Cannot be Blank.'
    }

    if(this.editArticle.url === ''){
      valid = false;
      this.errString = 'Url Cannot be Blank.'
    }

    if(this.editArticle.imageURL === ''){
      valid = false;
      this.errString = 'Image Url Cannot be Blank.'
    }

    if(this.editArticle.published === ''){
      valid = false;
      this.errString = 'Publishing Date Cannot be Blank.'
    }

    return valid;
  }

  handleEdit() {
    if(this.validate()){
      const data = {
        _id: this.editArticle._id,
        title: this.editArticle.title,
        description: this.editArticle.description,
        url: this.editArticle.url,
        imageUrl: this.editArticle.imageUrl,
        published: this.editArticle.published
      }
  
      this.articleService.updateArticle(data).subscribe(() => {
        // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        //     this.router.navigate(['/admin/data']);
        // }); 
        // $("#newsTable").load(location.href + " #newsTable"); // Add space between URL and selector.
        this.messengerService.sendMsg({
          type: 'success',
          msg: 'News Article Updated!'
        });
      },
      (err) => {
        this.errString = err.error._message
        console.log(err)
      })
    }
  }

  ngAfterViewInit() {
    $('#btnSave').click(function() {
        $('#editModal').modal('hide');
    });
    $('#btnDelete').click(function() {
      $('#deleteModal').modal('hide');
  });
  }
  

  handleDelete() {
    this.articleService.deleteArticle(this.idToDelete).subscribe(() => {
      this.messengerService.sendMsg({
        type: 'success',
        msg: 'Article Deleted!'
      });
    })
  }

}
