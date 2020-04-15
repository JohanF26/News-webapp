import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service'; 

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  type: string = '';
  msg: string = '';

  constructor(private messenger: MessengerService) { }

  ngOnInit(): void {
    this.messenger.getMsg().subscribe((msgObj: any) => {
      this.msg = msgObj.msg;
      this.type = msgObj.type;
    })
  }

}
