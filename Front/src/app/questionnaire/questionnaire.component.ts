// questionnaire.component.ts
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  sidebarClosed: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const sidebar = this.elementRef.nativeElement.querySelector('#sidebar');
    const mainContent = document.querySelector('.main-content') as HTMLElement;

    if (sidebar && mainContent) {
      this.renderer.listen(sidebar, 'click', () => {
        this.sidebarClosed = !this.sidebarClosed; // Toggle the sidebar state

        if (this.sidebarClosed) {
          sidebar.style.width = '0';
          mainContent.style.width = '100%'; // Adjust the width of the main content
        } else {
          sidebar.style.width = '30%';
          mainContent.style.width = '70%'; // Adjust the width of the main content
        }
      });
    }
  }
}
