import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-result',
  templateUrl: './check-result.component.html',
  styleUrls: ['./check-result.component.css']
})
export class CheckResultComponent implements OnInit {
  public examname;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => {
      this.examname = res["examname"];
    });
  }

}
