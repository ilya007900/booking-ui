import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchHotelsQuerysResult } from '../interfaces/search-hotels-query-result';
import { environment } from '../../../environments/environment';
import { OrderBy } from '../interfaces/order-by';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  baseUrl = `${environment.apiUrl}/hotels`;

  constructor(private readonly http: HttpClient) {

  }

  searchHotels(cityId: number, start: string, end: string): Observable<SearchHotelsQuerysResult[]> {
    return this.http.get<SearchHotelsQuerysResult[]>(`${this.baseUrl}/search`, {
      params: new HttpParams().set('cityId', cityId).set('start', start).set('end', end)
    });
  }

  bookHotel(hotelId: number, start: string, end: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${hotelId}/occupancy`, {
      start: start,
      end: end
    });
  }

  ordderHotelsBy(hotels: SearchHotelsQuerysResult[], orderBy: OrderBy) : SearchHotelsQuerysResult[] {
    switch (orderBy) {
      case OrderBy.priceAsc:
        return hotels.sort((a, b) => a.totalPrice - b.totalPrice);
      case OrderBy.priceDesc:
        return hotels.sort((a, b) => b.totalPrice - a.totalPrice);
      case OrderBy.ratingAsc:
        return hotels.sort((a, b) => a.rating - b.rating);
      case OrderBy.ratingDesc:
        return hotels.sort((a, b) => b.rating - a.rating);
      default:
        return hotels;
    }
  }
}
