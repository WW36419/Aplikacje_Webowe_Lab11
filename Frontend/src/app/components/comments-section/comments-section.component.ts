import { Component, Input, OnInit } from '@angular/core';
import { CommentsItemComponent } from '../comments-item/comments-item.component';
import { CommentsService } from '../../services/comments.service';
import { CommonModule } from '@angular/common';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'comments-section',
  imports: [CommentsItemComponent, CommonModule, ReactiveFormsModule],
  providers: [CommentsService],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css'
})

export class CommentsSectionComponent implements OnInit {
  commentForm = new FormGroup({
    user: new FormControl('', Validators.required), 
    content: new FormControl('', Validators.required)
  })
  public comment_items: any;
  @Input() postId?: string;

  constructor(public service: CommentsService) {}

  ngOnInit() {
    this.comment_items = this.service.getCommentsForPost(this.postId)
  }

  sendComment() {
    const comment = this.commentForm.value
    this.service.addComment(this.postId!, comment.user!, comment.content!)
    this.ngOnInit()
  }
}
