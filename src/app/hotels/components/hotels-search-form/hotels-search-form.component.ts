import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatesRange } from '../../../shared/helpers/dates-range';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { GetCountriesQueryResult } from '../../interfaces/get-countries-query-result';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-hotels-search-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotels-search-form.component.html',
  styleUrl: './hotels-search-form.component.scss'
})
export class HotelsSearchFormComponent {
  @Input() $countries!: Observable<GetCountriesQueryResult[]>;
  @Input() $country!: Observable<Country>;
  @Input() country: number | null = null;
  @Input() city: number | null = null;
  @Input() canSearch = false;

  @Output() countryChange = new EventEmitter<number>();
  @Output() cityChange = new EventEmitter<number>();
  @Output() startChange = new EventEmitter<string>();
  @Output() endChange = new EventEmitter<string>();
  @Output() searchClick = new EventEmitter();

  datesRange: DatesRange = new DatesRange("", "", new Date());

  get start(): string {
    return this.datesRange?.start;
  }

  @Input() set start(value: string) {
    this.datesRange.updateStart(value);
  }

  get end(): string {
    return this.datesRange?.end;
  }

  @Input() set end(value: string) {
    this.datesRange.updateEnd(value);
  }

  onStartChange(start: string):void{
    this.startChange.emit(start)
  }

  onEndChange(end: string):void{
    this.endChange.emit(end)
  }

  onCountryChange(country: number): void {
    this.countryChange.emit(country);
  }

  onCityChange(city: number):void{
    this.cityChange.emit(city);
  }

  onSearchClick(): void {
    this.searchClick.emit();
  }

  minStartPeriod(): string {
    return this.datesRange.minStart;
  }

  minEndPeriod(): string {
    return this.datesRange.minEnd;
  }
}
