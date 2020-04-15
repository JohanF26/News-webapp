import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = ''
  password: string = ''
  userPassErr: string = ''

  constructor(
    private userService: UserService,
    private messenger: MessengerService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    const data = {
      email: this.email,
      password: this.password
    }

    this.userService.login(data).subscribe((obj: any) => {
      this.userService.setUserObj(JSON.stringify(obj))
      console.log(obj.isAdmin)
      if(obj.isAdmin){
        this.router.navigate(['/admin/data'])
        this.messenger.sendMsg({
          type: 'success',
          msg: 'Logged In as Admin'
        });
      } else{
        console.log("It is User!")
        this.messenger.sendMsg({
          type: 'success',
          msg: 'Logged In as User'
        });
      }
      this.userPassErr = ''
      this.email = ''
      this.password = ''
    },
    (err) => this.userPassErr = err.error.msg)

  }

  formReset() {
    this.email = '';
    this.password = '';
    this.userPassErr = '';
  }

}
