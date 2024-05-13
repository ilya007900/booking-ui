import { Component, OnInit } from '@angular/core';
import { SearchHotelsQuerysResult } from '../../interfaces/search-hotels-query-result';
import { Observable, map } from 'rxjs';
import { GetCountriesQueryResult } from '../../interfaces/get-countries-query-result';
import { Country } from '../../interfaces/country';
import { HotelService } from '../../services/hotel.service';
import { GeographicalDataService } from '../../services/geographical-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelComponent } from '../hotel/hotel.component';
import { NotificationService } from '../../../shared/services/notification.service';
import { DatesRange } from '../../../shared/helpers/dates-range';

@Component({
  selector: 'app-hotels-shell',
  standalone: true,
  imports: [CommonModule, FormsModule, HotelComponent],
  templateUrl: './hotels-shell.component.html',
  styleUrl: './hotels-shell.component.scss'
})
export class HotelsShellComponent implements OnInit {
  $hotels!: Observable<SearchHotelsQuerysResult[]>;
  $countries!: Observable<GetCountriesQueryResult[]>;
  $country!: Observable<Country>;
  selectedCountry: number | null = null;

  datesRange!: DatesRange;

  cityId!: number;

  get start(): string {
    return this.datesRange?.start;
  }

  set start(value: string) {
    this.datesRange.updateStart(value);
  }

  get end(): string {
    return this.datesRange?.end;
  }

  set end(value: string) {
    this.datesRange.updateEnd(value);
  }

  orderByValues = [OrderBy.priceAsc, OrderBy.priceDesc, OrderBy.ratingAsc, OrderBy.ratingDesc];
  orderBy = OrderBy.none;

  constructor(
    private readonly hotelService: HotelService,
    private readonly geographicalDataService: GeographicalDataService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    activatedRoute: ActivatedRoute) {

    activatedRoute.queryParamMap.subscribe(result => {
      this.cityId = Number.parseInt(result.get('cityId')!);
      const from = result.get('from')!;
      const to = result.get('to')!;

      this.datesRange = new DatesRange(from, to, new Date());

      if (!this.canSearch()) {
        return;
      }

      this.$hotels = this.hotelService.searchHotels(this.cityId, from, to);

      this.$country = this.geographicalDataService.getCountryByCityId(this.cityId).pipe(map(country => {
        this.selectedCountry = country.id
        return country;
      }));
    });
  }

  ngOnInit(): void {
    this.$countries = this.geographicalDataService.getCountries();
  }

  orderByChnage(orderBy: OrderBy, hotels: SearchHotelsQuerysResult[]): void {
    switch (orderBy) {
      case OrderBy.priceAsc:
        hotels.sort((a, b) => a.totalPrice - b.totalPrice);
        return;
      case OrderBy.priceDesc:
        hotels.sort((a, b) => b.totalPrice - a.totalPrice);
        return;
      case OrderBy.ratingAsc:
        hotels.sort((a, b) => a.rating - b.rating);
        return;
      case OrderBy.ratingDesc:
        hotels.sort((a, b) => b.rating - a.rating);
        return;
      default:
        return;
    }
  }

  minStartPeriod(): string {
    return this.datesRange.minStart;
  }

  minEndPeriod(): string {
    return this.datesRange.minEnd;
  }

  onCountrySelected(country: number): void {
    this.$country = this.geographicalDataService.getCountry(country);
  }

  canSearch(): boolean {
    return !!(this.cityId && this.start && this.end);
  }

  onSearchClick(): void {
    this.router.navigate([], { queryParams: { cityId: this.cityId!, from: this.start, to: this.end } }).then(succeed => {
      if (!succeed) {
        this.$hotels = this.hotelService.searchHotels(this.cityId, this.start, this.end);
      }
    });
  }

  onBookClicked(hotel: SearchHotelsQuerysResult): void {
    this.hotelService.bookHotel(hotel.id, this.start, this.end).subscribe({
      next: reult => {
        hotel.occupied = true;
        this.notificationService.notifySuccess('Hotel booked.')
      },
      error: error => {
        this.notificationService.notifyError('Can not book hotel. Try again later.')
      }
    });
  }
}

export enum OrderBy {
  none = "",
  ratingAsc = "Rating ASC",
  ratingDesc = "Rating DESC",
  priceAsc = "Price ASC",
  priceDesc = "Price DESC"
};

