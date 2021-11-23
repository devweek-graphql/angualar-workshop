import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit, OnChanges {

  @Input() name: String = '';
  @Input() title: String = '';
  @Input() value: String = '';
  @Input() placeholder: String = '';
  @Input() type: String = '';
  @Input() disabled: string = 'false';


  mustDisableInput: boolean = false;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.mustDisableInput = this.isInputDisabled();
  }

  ngOnInit(): void {
    this.mustDisableInput = this.isInputDisabled();
  }

  isInputDisabled() {
    return this.disabled === 'true';
  }
}
