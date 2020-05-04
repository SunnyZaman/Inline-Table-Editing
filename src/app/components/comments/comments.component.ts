import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments = [];
  tableHeaders = [
    {
      key: "Information",
      text: "Information",
      style:{'color': '#355796', 'font-weight': 700},
      cell: (row: any) => `${row.Information}<br/><span class="comment-info">${row.Date}</span>`
    },
    {
      key: "Comment",
      text: "Comment",
      cell: (row: any) => `${row.Comment}`
    },
  ];
  constructor() { }

  ngOnInit(): void {
    this.comments = [
      {
        Information: "Sunny Zaman",
        Date: new Date().toDateString(),
        Comment: "This application is built with Angular Material"
      }
    ]
  }

}
