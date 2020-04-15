import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AddnewsComponent } from './components/admin/addnews/addnews.component';
import { DataComponent } from './components/admin/data/data.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { AdminHeaderComponent } from './components/shared/admin-header/admin-header.component';
import { EditnewsComponent } from './components/admin/editnews/editnews.component';
import { NewsItemComponent } from './components/admin/news-item/news-item.component';
import { SearchPipe } from './pipes/search.pipe';
import { DatePipe } from './pipes/date.pipe';

import * as bootstrap from "bootstrap";
import * as $ from "jquery";
import { AlertComponent } from './components/shared/alert/alert.component';

const routes: Routes =
[
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/news', component: AddnewsComponent },
  { path: 'admin/data', component: DataComponent },
  { path: 'admin/news/:id', component: EditnewsComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    AddnewsComponent,
    DataComponent,
    AdminHeaderComponent,
    EditnewsComponent,
    NewsItemComponent,
    SearchPipe,
    DatePipe,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
