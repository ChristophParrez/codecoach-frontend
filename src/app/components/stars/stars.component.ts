import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StarsComponent),
    multi: true
  }]
})
export class StarsComponent implements OnInit, ControlValueAccessor {

  @Input() max: number = 5;
  @Input() value: number = 0;
  @Input() clickable: boolean = false;

  stars: Star[] = [];
  onChange = (value: number) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  constructor() { }

  ngOnInit(): void {
    this.setStars();
  }

  setStars() {
    if (this.max < this.value) return;
    this.stars = [];
    for (let i = 1; i <= this.max; i++) {
      this.stars.push({
        value: i,
        filled: i <= this.value
      })
    }
  }

  onStarClick(value: number) {
    if (!this.clickable || this.disabled) return;
    this.markAsTouched();
    this.value = value;
    this.onChange(value);
    this.setStars();
  }

  writeValue(value: number): void {
    this.value = value;
    this.setStars();
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

export interface Star {
  value: number;
  filled: boolean;
}
