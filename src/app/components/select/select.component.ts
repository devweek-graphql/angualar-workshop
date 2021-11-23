import { Component, forwardRef, Input, OnChanges, OnInit } from '@angular/core';
import { KeyValue } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit, OnChanges {

  constructor() { }

  @Input()
  values: KeyValue[] = []

  @Input() disabled: string = 'false';
  @Input() name: string = '';
  @Input() value: string = '';

  mustDisableInput: boolean = false;

  ngOnInit(): void {
    this.mustDisableInput = this.isInputDisabled();
  }

  ngOnChanges() {
    this.mustDisableInput = this.isInputDisabled();
  }

  isInputDisabled() {
    return this.disabled === 'true';
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }
}
