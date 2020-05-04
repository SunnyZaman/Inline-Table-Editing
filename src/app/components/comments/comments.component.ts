import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments = [];
  commentForm: FormGroup;
  tableHeaders = [
    {
      key: "Information",
      text: "Information",
      style: { 'color': '#355796', 'font-weight': 700 },
      cell: (row: any) => `${row.Information}<br/><span class="comment-info">${row.Date}</span>`
    },
    {
      key: "Comment",
      text: "Comment",
      cell: (row: any) => `<div class="comment-container"><div class="comment-cell">${row.Comment}</div></div>`
    },
  ];
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.commentForm = this.formBuilder.group({
      comment: ""
    });
  }

  ngOnInit(): void {
    this.comments = [
      {
        Information: "Sunny Zaman",
        Date: new Date().toISOString().split("T")[0],
        Comment: "This application is built with Angular Material"
      }
    ]
  }

  addComment() {
    const comment = this.commentForm.controls.comment.value;
    this.comments.unshift({
      Information: "Sunny Zaman", //Will be the user
      Date: new Date().toISOString().split("T")[0],
      Comment: comment
    });
    this.comments = [...this.comments];
    this.commentForm.patchValue({ comment: "" });
  }

}
