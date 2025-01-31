import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { BlogComponent } from '../blog/blog.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'blog-home',
  standalone: true,
  imports: [SearchBarComponent, BlogComponent, CommonModule],
  providers: [DataService],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.css'
})
export class BlogHomeComponent implements OnInit {
  public filterText: string = '';
  public items$: any;

  constructor(private service: DataService) {}
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.service.getAll().subscribe(response => {
      this.items$ = response;
    });
   }  

  getName($event: string): void {
    this.filterText = $event;
  }

  refreshPosts(): void {
    this.getAll();
    location.reload();
  }
}
