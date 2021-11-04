import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {

  private message: string
  private numb: number
  private type: boolean

  constructor(
    ) {
    this.message = "",
    this.numb = 0,
    this.type = false
  }

  ngOnInit(): void {}

  getMessage(): string {
    return this.message
  }

  getNumb(): number {
    return this.numb
  }

  getType(): boolean {
    return this.type
  }

  setMessage(value: string): void {
    this.message = value
  }

  setNumb(value: number): void {
    this.numb = value
  }

  setType(value: boolean): void {
    this.type = value
  }






}
