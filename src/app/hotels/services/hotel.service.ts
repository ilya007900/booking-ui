import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchHotelsQuerysResult } from '../interfaces/search-hotels-query-result';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  baseUrl = 'https://localhost:7097/api/hotels';

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
}
