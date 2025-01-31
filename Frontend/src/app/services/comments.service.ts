import { Injectable } from '@angular/core';

const comments = [
  {
    "postId": "64549b6062f53f833c89f6ac",
    "user": "UserWW",
    "content": "Good Morning!"
  }
]

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }

  public getCommentsForPost(postId?: string) {
    return comments.filter((comment) => {return comment.postId === postId})
  }

  public addComment(postId: string, user: string, content: string) {
    comments.push({
      "postId": postId,
      "user": user,
      "content": content
    })
  }
}
