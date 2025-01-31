import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { GalleryItemComponent } from '../gallery-item/gallery-item.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'gallery',
  standalone: true,
  imports: [GalleryItemComponent, CommonModule, HttpClientModule],
  providers: [DataService],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  public items$: any
  public width: number = 100

  constructor(private service: DataService) {}

  ngOnInit() {
    this.service.getAll().subscribe(response => {
      this.items$ = response;
    });
  }

  changeWidth() {
    this.width += 50
    if (this.width > 200) {
      this.width = 100
    }
  }

}
