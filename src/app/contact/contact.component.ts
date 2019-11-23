import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  users:Object;
  errorMessage:string

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getUsers().subscribe(
      data=>{
        this.users = data
      },
      err=>this.errorMessage=err
    )
  }

}
