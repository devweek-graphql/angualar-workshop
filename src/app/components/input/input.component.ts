import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit } from '@angular/core';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {

  @Input() name: String = '';
  @Input() title: String = '';
  @Input() value: String = '';
  @Input() placeholder: String = '';
  @Input() type: String = '';
  @Input() disabled: string = 'false';


  mustDisableInput: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.mustDisableInput = this.isInputDisabled();
  }

  isInputDisabled() {
    return this.disabled === 'true';
  }
}
