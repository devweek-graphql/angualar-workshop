import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  @Input() controlName: string = '';


  formGroup!: FormGroup;

  mustDisableInput: boolean = false;

  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    console.log(this.controlName)
    this.mustDisableInput = this.isInputDisabled();
    this.formGroup = this.rootFormGroup.control;
  }

  isInputDisabled() {
    return this.disabled === 'true';
  }
}
