import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
 providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:3100';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.url + '/api/posts');
  }

  getById(id: string) {
    return this.http.get(this.url + '/api/post/' + id);
  }

 public addPost(postId:string, title:string, text:string, image:string) {
  const post = {
   "title": title,
   "text": text,
   "image": image,
   "id": postId
  }
  return this.http.post(this.url + '/api/post', post)
 }

 public delPost(postId:string) {
  return this.http.delete(this.url + '/api/post/' + postId)
 }
}
