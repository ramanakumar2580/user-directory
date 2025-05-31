import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DocumentationService } from '../../services/documentation.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css'],
})
export class DocumentationComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  content = '';

  constructor(public docs: DocumentationService) {}

  ngAfterViewInit() {
    this.docs.setDrawer(this.drawer);

    this.docs.currentContent.subscribe((contentType) => {
      this.content = this.docs.getContent(contentType);
      if (contentType) {
        this.drawer.open();
      }
    });
  }
}
