import {Component, Input} from '@angular/core';
import {DataService} from "../../services/data.service";
import {BlogItemComponent} from "../blog-item/blog-item.component";
import { AddPostComponent } from '../add-post/add-post.component';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { FilterTextPipe } from '../../pipes/filter-text.pipe';

@Component({
 selector: 'blog',
 standalone: true,
 imports: [HttpClientModule, BlogItemComponent, CommonModule, SearchBarComponent, FilterTextPipe],
 providers: [DataService],
 templateUrl: './blog.component.html',
 styleUrl: './blog.component.css'
})
export class BlogComponent {
  @Input() filterText: string = '';
  @Input() items$: any;

  constructor() {}
}
