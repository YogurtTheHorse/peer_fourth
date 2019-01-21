import {
  Component, Input, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Hit} from '../models/hit';
import {ApiService} from "../api/api.service";

@Component({
  selector: 'app-canvas',
  template: '<canvas #canvas (click)="getData($event)"></canvas>',
  styles: ['canvas { border: 1px solid #000; width: 100%; height: 100%; }']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') public canvas: ElementRef;
  @Input() radius;
  @Input() submitted;
  @Input() hits;
  @Input() form: NgForm;
  @Input() isClicked;
  @Input() isRadiusSet;
  public x: number;
  public y: number;

  private width: number;
  private height: number;

  private ctx: CanvasRenderingContext2D;

  constructor(private apiService: ApiService) {
  }

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');

    this.ctx.strokeStyle = '#000';

    this.updateChart(1, null);
  }

  public getData(event) {
    this.isClicked = true;
    if (this.isRadiusSet === true) {
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      this.ctx.fillStyle = 'red';
      this.ctx.beginPath();
      this.ctx.arc(event.clientX - rect.left, event.clientY - rect.top, 1, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.fillStyle = '#000';

      const x = (event.clientX - rect.left - this.width / 2) / 20;
      const y = (this.height / 2 - event.clientY + rect.top) / 20;

      console.log(event);
      console.log(rect);
      console.log(x, y);

      this.x = x;
      this.y = y;
    } else {
      this.isClicked = false;
    }
    this.form.ngSubmit.emit();
  }

  public updateChart(radius, history: Hit[]) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.width = this.ctx.canvas.width = rect.width;
    this.height = this.ctx.canvas.height = rect.height;
    this.radius = radius;

    this.drawArea();
    this.drawAxis();
    this.drawArrows();
    this.drawTips();
    this.drawXValues();
    this.drawYValues();
    if (history) {
      this.drawPreviousHits(history);
    }
  }

  private drawAxis() {
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.moveTo(Math.floor(this.width / 2) - 0.5, 0);
    ctx.lineTo(Math.floor(this.width / 2) - 0.5, this.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, this.height / 2 - 0.5);
    ctx.lineTo(this.width, this.height / 2 - 0.5);
    ctx.stroke();
  }

  private drawArrows() {
    const ctx = this.ctx;
    ctx.beginPath();

    ctx.moveTo(this.width / 2 - 0.5, 0);
    ctx.lineTo(this.width / 2 - 2.5, 7);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.width / 2 - 0.5, 0);
    ctx.lineTo(this.width / 2 + 1.5, 7);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.width, this.height / 2 - 0.5);
    ctx.lineTo(this.width - 7, this.height / 2 - 3.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.width, this.height / 2 - 0.5);
    ctx.lineTo(this.width - 7, this.height / 2 + 2.5);
    ctx.stroke();
  }

  private drawTips() {
    const ctx = this.ctx;

    for (let i = this.width / 2 - Math.floor(this.width / 20) * 20; i <= this.width / 2 + Math.floor(this.width / 20) * 20; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i - 0.5, this.height / 2 - 3);
      ctx.lineTo(i - 0.5, this.height / 2 + 2);
      ctx.stroke();
    }
    for (let i = this.height / 2 - Math.floor(this.height / 20) * 20; i <= this.height / 2 + Math.floor(this.height / 20) * 20; i += 20) {
      ctx.beginPath();
      ctx.moveTo(this.width / 2 - 3, i - 0.5);
      ctx.lineTo(this.width / 2 + 2, i - 0.5);
      ctx.stroke();
    }
  }

  private drawXValues() {
    const ctx = this.ctx;
    let x = this.width / 2 - (Math.floor(this.width / 20)) * 20;

    ctx.font = '9px Arial';

    for (let i = -Math.floor(this.width / 20 + 1); i < Math.floor(this.width / 20); ++i) {
      if (i != 0) {
        ctx.fillText(i + '', x, this.height / 2 - 3);
      }

      x += 20;
    }
  }

  private drawYValues() {
    const ctx = this.ctx;
    let y = this.height / 2 + Math.floor(this.height / 20) * 16;

    ctx.font = '9px Arial';

    for (let i = 12; i >= -12; --i) {
      if (i != 0) {
        ctx.fillText(i + '', this.width / 2 + 3, y + 4.5);
      }

      y -= 20;
    }
  }

  public clearChart() {
    this.ctx.clearRect(0, 0, 500, 500);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, 500, 500);
    this.ctx.fillStyle = '#000';
    this.ctx.strokeRect(0, 0, 500, 500);
    this.drawAxis();
    this.drawArrows();
    this.drawTips();
    this.drawXValues();
    this.drawYValues();
  }

  private drawArea() {
    const ctx = this.ctx;
    ctx.fillStyle = '#3399ff';
    ctx.fillRect(this.width / 2, this.height / 2 - this.radius * 20, this.radius * 20, this.radius * 20);
    ctx.beginPath();
    ctx.moveTo(this.width / 2, this.height / 2);
    ctx.lineTo(this.width / 2, this.height / 2 + this.radius * 10);
    ctx.lineTo(this.width / 2 - this.radius * 20, this.height / 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(this.width / 2, this.height / 2);
    ctx.arc(this.width / 2, this.height / 2, this.radius * 20, Math.PI, Math.PI * 3 / 2);
    ctx.fill();
    ctx.fillStyle = '#000';
  }

  public drawPreviousHits(history: Hit[]) {
    for (let i = 0; i < history.length; ++i) {
      if (history[i].checked) {
        this.ctx.fillStyle = '#11FF00';
      } else {
        this.ctx.fillStyle = 'red';
      }
      if (history[i].r === this.radius) {
        this.ctx.beginPath();
        this.ctx.arc(history[i].x * 20 + this.width / 2 + 0.5, this.height / 2 - history[i].y * 20 - 0.5, 1, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
    this.ctx.fillStyle = '#000';
  }

}
