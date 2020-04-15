import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  @Input() userStr: string;
  @Input() userType: string;
  @Input() isAdmin: boolean;

  constructor(
    private userService: UserService,
    private messenger: MessengerService,
    private router: Router
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

  clearMessage() {
    this.messenger.sendMsg({
      type: '',
      msg: ''
    });
  }

  handleLogOut() {
    this.userStr = ''
    this.userType = ''
    this.isAdmin = false;
    this.userService.logout()
    this.router.navigate(['/'])
    this.messenger.sendMsg({
      type: 'success',
      msg: 'Successfully Logged Out'
    });
  }

}
