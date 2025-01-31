import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BlogItemImageComponent} from "../blog-item-image/blog-item-image.component";
import {BlogItemTextComponent} from "../blog-item-text/blog-item-text.component";
import { CommentsSectionComponent } from '../comments-section/comments-section.component';
import { DataService } from '../../services/data.service';


@Component({
 selector: 'blog-item',
 standalone: true,
 imports: [BlogItemImageComponent, BlogItemTextComponent, CommentsSectionComponent, CommonModule],
 providers: [DataService],
 templateUrl: './blog-item.component.html',
 styleUrl: './blog-item.component.css'
})
export class BlogItemComponent {
    @Input() title?: string;
    @Input() image?: string;
    @Input() text?: string;
    @Input() postId?: string;

    constructor(private service: DataService) {}

    deletePost(): void {
        this.service.delPost(this.postId!).subscribe((result: any) => {
            if (result.msg !== null)
                if (result.msg === "OK") {
                    alert("Usunięto post pomyślnie!")
                    location.reload();
                } else
                    alert("Błąd z usunięciem postu.")
            alert("Możliwy problem połączenia z serwerem!")

            return result;
        });
    }
}
