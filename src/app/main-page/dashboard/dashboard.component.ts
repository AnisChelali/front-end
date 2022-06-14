import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GalleryServices } from 'src/app/services/gallery.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  nbrCleanImages: number;
  nbrUnCleanImages: number;

  canvas: any;
  ctx: any;
  @ViewChild('myChart') myChart: ElementRef;

  constructor(private galleryService: GalleryServices) {}

  ngAfterViewInit(): void {
    this.canvas = this.myChart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
  }

  async ngOnInit() {
    Chart.register(...registerables);
    const res = await this.galleryService.getStatisticsImages().toPromise();
    this.nbrCleanImages = res.lengthCleanImages;
    this.nbrUnCleanImages = res.lengthUnCleanImages;
    console.log(this.nbrCleanImages, this.nbrUnCleanImages);

    new Chart(this.ctx, {
      type: 'polarArea',
      data: {
        labels: ['Clean Images', 'Unclean Images'],
        datasets: [
          {
            data: [this.nbrCleanImages, this.nbrUnCleanImages],
            backgroundColor: ['rgb(100, 198, 1, 60%)', 'rgb(255, 0, 0, 60%)'],
            borderColor: ['#64c601', 'red'],
          },
        ],
      },
    });
  }
}
