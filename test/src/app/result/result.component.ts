import  {Component, OnInit} from '@angular/core';
import {ServiceService} from "../service.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  Firstname: any;

  constructor(private service: ServiceService) {
  }

  ngOnInit(): void {
    this.service.User().subscribe(data => {
      this.Firstname = (data as any).firstname;
    })
  }

}
