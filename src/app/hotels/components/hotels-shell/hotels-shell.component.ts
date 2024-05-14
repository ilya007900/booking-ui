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
import { OrderBy } from '../../interfaces/order-by';
import { HotelsSearchFormComponent } from '../hotels-search-form/hotels-search-form.component';

@Component({
  selector: 'app-hotels-shell',
  standalone: true,
  imports: [CommonModule, FormsModule, HotelComponent, HotelsSearchFormComponent],
  templateUrl: './hotels-shell.component.html',
  styleUrl: './hotels-shell.component.scss'
})
export class HotelsShellComponent implements OnInit {
  $hotels!: Observable<SearchHotelsQuerysResult[]>;
  $countries!: Observable<GetCountriesQueryResult[]>;
  $country!: Observable<Country>;

  country: number | null = null;
  city: number | null = null;

  start!: string;
  end!: string;

  get canSearch(): boolean {
    return !!(this.city && this.start && this.end);
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
      this.city = Number.parseInt(result.get('cityId')!);
      this.start = result.get('from')!;
      this.end = result.get('to')!;

      if (!this.canSearch) {
        return;
      }

      this.$hotels = this.hotelService.searchHotels(this.city, this.start, this.end);

      if(this.$country){
        return;
      }

      this.$country = this.geographicalDataService.getCountryByCityId(this.city).pipe(map(country => {
        this.country = country.id
        return country;
      }));
    });
  }

  ngOnInit(): void {
    this.$countries = this.geographicalDataService.getCountries();
  }

  orderByChnage(orderBy: OrderBy, hotels: SearchHotelsQuerysResult[]): void {
    hotels = this.hotelService.ordderHotelsBy(hotels, orderBy);
  }

  onCountrySelected(country: number): void {
    this.$country = this.geographicalDataService.getCountry(country);
  }

  onSearchClick(): void {
    this.orderBy = OrderBy.none;
    this.router.navigate([], { queryParams: { cityId: this.city!, from: this.start, to: this.end } }).then(succeed => {
      if (!succeed) {
        this.$hotels = this.hotelService.searchHotels(this.city!, this.start, this.end);
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


