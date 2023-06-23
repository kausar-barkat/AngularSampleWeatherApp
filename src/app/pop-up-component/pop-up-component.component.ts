import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up-component',
  templateUrl: './pop-up-component.component.html',
  styleUrls: ['./pop-up-component.component.css']
})
export class PopUpComponentComponent {
  @Output() confirmClicked = new EventEmitter();
  @Output() cancelClicked = new EventEmitter();

  confirm() {
    this.confirmClicked.emit();
  }

  cancel() {
    this.cancelClicked.emit();
  }
}
