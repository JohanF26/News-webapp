import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'certification-project';

  userStr: string = '';
  userType: string;
  isAdmin = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    
    this.userService.getUserObj().subscribe((value: string) => {
      this.userStr = value
      if(this.userStr !== ''){
        this.isAdmin = JSON.parse(this.userStr).isAdmin
        if(this.isAdmin){
          this.userType = 'Admin'
        } else{
          this.userType = 'User'
        }
      }
    })
  }
}
