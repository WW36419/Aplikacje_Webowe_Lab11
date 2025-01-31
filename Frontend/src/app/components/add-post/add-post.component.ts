import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'add-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DataService],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  postForm = new FormGroup({
    postId: new FormControl('', Validators.required), 
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required)
  })

  constructor(private service: DataService) {}

  sendPost() {
    const post = this.postForm.value
    this.service.addPost(post.postId!, post.title!, post.text!, post.image!).subscribe((result: any) => {
      if (result.title !== null)
        alert("Post o nazwie '"+result.title+"' wysłano!");
      else 
        alert("Nie udano wysłać postu!");
      return result;
    })
  }
}
