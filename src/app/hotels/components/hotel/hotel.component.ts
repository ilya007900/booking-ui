import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchHotelsQuerysResult } from '../../interfaces/search-hotels-query-result';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.scss'
})
export class HotelComponent {

  @Input() hotel!: SearchHotelsQuerysResult;

  @Output() booked = new EventEmitter<SearchHotelsQuerysResult>();

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://picsum.photos/320/240/?image=288'
  }

  onBookClicked() {
    this.booked.emit(this.hotel);
  }

  canBook(){
    return !this.hotel.occupied;
  }
}
