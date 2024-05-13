import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetCountriesQueryResult } from '../interfaces/get-countries-query-result';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class GeographicalDataService {

  baseUrl = 'https://localhost:7097/api/GeographicalData';

  constructor(private readonly http: HttpClient) {

  }

  getCountries(): Observable<GetCountriesQueryResult[]> {
    return this.http.get<GetCountriesQueryResult[]>(`${this.baseUrl}/countries`);
  }

  getCountry(countryId: number): Observable<Country> {
    return this.http.get<Country>(`${this.baseUrl}/countries/${countryId}`);
  }

  getCountryByCityId(cityId: number): Observable<Country> {
    return this.http.get<Country>(`${this.baseUrl}/countries/search`, { params: new HttpParams().set('cityId', cityId) });
  }
}
