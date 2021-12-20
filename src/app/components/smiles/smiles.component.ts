import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-smiles',
  templateUrl: './smiles.component.html',
  styleUrls: ['./smiles.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SmilesComponent),
    multi: true
  }]
})
export class SmilesComponent implements OnInit, ControlValueAccessor {

  @Input() max: number = 5;
  @Input() value: number = 0;
  @Input() clickable: boolean = false;

  smiles: Smile[] = [];
  onChange = (value: number) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  constructor() { }

  ngOnInit(): void {
    this.setSmiles();
  }

  setSmiles() {
    if (this.max < this.value) return;
    this.smiles = [];
    for (let i = 1; i <= this.max; i++) {
      this.smiles.push({
        value: i,
        filled: i <= this.value
      })
    }
  }

  onSmileClick(value: number) {
    if (!this.clickable || this.disabled) return;
    this.markAsTouched();
    this.value = value;
    this.onChange(value);
    this.setSmiles();
  }

  writeValue(value: number): void {
    this.value = value;
    this.setSmiles();
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

}

export interface Smile {
  value: number;
  filled: boolean;
}

