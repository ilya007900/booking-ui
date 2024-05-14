import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HotelService } from './hotel.service';
import { SearchHotelsQuerysResult } from '../interfaces/search-hotels-query-result';

describe('HotelService', () => {
  let service: HotelService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelService]
    });
    service = TestBed.inject(HotelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return hotels when searchHotels is called', () => {
    const cityId = 1;
    const start = '2024-05-15';
    const end = '2024-05-20';

    const mockHotels: SearchHotelsQuerysResult[] = [
      {
        id: 1,
        name: 'Luxury Hotel',
        country: 'FakeCountry',
        city: 'FakeCity',
        rating: 4.5,
        pricePerNight: 150,
        totalPrice: 750,
        totalNights: 5,
        photoUrl: 'https://example.com/photo1.jpg',
        occupied: false
      },
      {
        id: 2,
        name: 'Budget Hotel',
        country: 'FictionalCountry',
        city: 'FictionalCity',
        rating: 3.2,
        pricePerNight: 80,
        totalPrice: 320,
        totalNights: 4,
        photoUrl: 'https://example.com/photo2.jpg',
        occupied: true
      }
    ];

    service.searchHotels(cityId, start, end).subscribe((hotels: SearchHotelsQuerysResult[]) => {
      expect(hotels).toEqual(mockHotels);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/search?cityId=${cityId}&start=${start}&end=${end}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHotels);
  });

  it('should book hotel when bookHotel is called', () => {
    const hotelId = 1;
    const start = '2024-05-15';
    const end = '2024-05-20';

    service.bookHotel(hotelId, start, end).subscribe((response: any) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.baseUrl}/${hotelId}/occupancy`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ start: start, end: end });
    req.flush({});
  });
});