import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  userPassErr: string = '';

  constructor(
    private userService: UserService,
    private messenger: MessengerService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  validate() {
    let valid = true;

    if(this.name === ''){
      valid = false;
      this.userPassErr = 'Username Cannot be Blank.'
    }

    if(this.password === ''){
      valid = false;
      this.userPassErr = 'Password Cannot be Blank.'
    }

    if(this.email === ''){
      valid = false;
      this.userPassErr = 'Email Address Cannot be Blank.'
    }

    return valid;
  }

  matchPassword(): boolean {
    let ret = true;
    let type = '';
    let msg = '';
    if(this.confirmPassword !== '' && this.password !== this.confirmPassword){
      type = 'warning';
      msg = 'Passwords do not match.'
      ret = false;
      this.userPassErr = msg
    }
    // this.messengerService.sendMsg({
    //   type: type,
    //   msg: msg
    // })
    return ret;
  }

  handleSubmit() {
    if(this.matchPassword() && this.validate()){
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      this.userService.registerUser(data).subscribe(() => {
        this.router.navigate(['/login'])
        this.messenger.sendMsg({
          type: 'success',
          msg: 'Successfully Registered'
        });
        this.name = ''
        this.email = ''
        this.password = ''
      },
      (err) => this.userPassErr = err.error.msg)

    }
  }

  formReset() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.userPassErr = '';
  }

}
