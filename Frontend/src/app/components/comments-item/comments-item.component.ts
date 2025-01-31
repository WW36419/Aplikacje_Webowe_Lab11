import { Component, Input } from '@angular/core';

@Component({
  selector: 'comments-item',
  imports: [],
  templateUrl: './comments-item.component.html',
  styleUrl: './comments-item.component.css'
})
export class CommentsItemComponent {
  @Input() user?: string;
  @Input() content?: string;
}
