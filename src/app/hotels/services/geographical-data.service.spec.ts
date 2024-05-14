import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GeographicalDataService } from './geographical-data.service';
import { GetCountriesQueryResult } from '../interfaces/get-countries-query-result';
import { Country } from '../interfaces/country';

describe('GeographicalDataService', () => {
    let service: GeographicalDataService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GeographicalDataService]
        });
        service = TestBed.inject(GeographicalDataService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return countries when getCountries is called', () => {
        const mockCountries: GetCountriesQueryResult[] = [
            { id: 1, name: 'Country A' },
            { id: 2, name: 'Country B' }
        ];

        service.getCountries().subscribe((countries: GetCountriesQueryResult[]) => {
            expect(countries).toEqual(mockCountries);
        });

        const req = httpMock.expectOne(`${service.baseUrl}/countries`);
        expect(req.request.method).toBe('GET');
        req.flush(mockCountries);
    });

    it('should return country when getCountry is called', () => {
        const countryId = 1;
        const mockCountry: Country = {
            id: 1, 
            name: 'Country A', 
            cities: [
                {
                    id: 1,
                    name: 'cityA'
                }
            ]
        };

        service.getCountry(countryId).subscribe((country: Country) => {
            expect(country).toEqual(mockCountry);
        });

        const req = httpMock.expectOne(`${service.baseUrl}/countries/${countryId}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockCountry);
    });

    it('should return country when getCountryByCityId is called', () => {
        const cityId = 1;
        const mockCountry: Country = {
            id: 1, 
            name: 'Country A', 
            cities: [
                {
                    id: 1,
                    name: 'cityA'
                }
            ]
        };

        service.getCountryByCityId(cityId).subscribe((country: Country) => {
            expect(country).toEqual(mockCountry);
        });

        const req = httpMock.expectOne(`${service.baseUrl}/countries/search?cityId=${cityId}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockCountry);
    });
});