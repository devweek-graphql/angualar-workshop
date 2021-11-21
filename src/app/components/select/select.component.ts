import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { KeyValue } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {

  constructor() { }

  @Input()
  values: KeyValue[] = [{
    key: '', value: 'Select'
  }]

  @Input() disabled: string = 'false';
  @Input() name: string = '';
  @Input() value: string = '';

  mustDisableInput: boolean = false;

  ngOnInit(): void {
    this.mustDisableInput = this.isInputDisabled();
  }

  isInputDisabled() {
    return this.disabled === 'true';
  }
}
