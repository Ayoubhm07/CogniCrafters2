// psychiatrist-details.component.ts
import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { User } from '../../Models/user.model';

@Component({
  selector: 'app-psychiatrist-details',
  templateUrl: './psychiatrist-details.component.html',
  styleUrls: ['./psychiatrist-details.component.scss']
})
export class PsychiatristDetailsComponent {
  @Input()
  psychiatrist!: User;
  isVisible = false;
  @Output() close = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges) {
    console.log('Changes detected in PsychiatristDetails:', changes);
    if (changes['psychiatrist']) {
      console.log('New psychiatrist data:', this.psychiatrist);
      this.showDetails();  // Automatically show details when psychiatrist data changes
    }
  }
  showDetails() {
    this.isVisible = true;
  }

  closeDetails() {
    this.close.emit();
  }
}
