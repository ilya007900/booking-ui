import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HotelsShellComponent } from './hotels-shell.component';
import { HotelService } from '../../services/hotel.service';
import { GeographicalDataService } from '../../services/geographical-data.service';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SearchHotelsQuerysResult } from '../../interfaces/search-hotels-query-result';
import { OrderBy } from '../../interfaces/order-by';

describe('HotelsShellComponent', () => {
    let component: HotelsShellComponent;
    let fixture: ComponentFixture<HotelsShellComponent>;
    let mockHotelService: jasmine.SpyObj<HotelService>;
    let mockGeographicalDataService: jasmine.SpyObj<GeographicalDataService>;
    let mockRouter: jasmine.SpyObj<Router>;
    let mockNotificationService: jasmine.SpyObj<NotificationService>;

    beforeEach(async () => {
        mockHotelService = jasmine.createSpyObj('HotelService', ['searchHotels', 'bookHotel']);
        mockGeographicalDataService = jasmine.createSpyObj('GeographicalDataService', ['getCountries', 'getCountryByCityId', 'getCountry']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);
        mockNotificationService = jasmine.createSpyObj('NotificationService', ['notifySuccess', 'notifyError']);

        await TestBed.configureTestingModule({
            imports: [FormsModule, HotelsShellComponent],
            declarations: [],
            providers: [
                { provide: HotelService, useValue: mockHotelService },
                { provide: GeographicalDataService, useValue: mockGeographicalDataService },
                { provide: Router, useValue: mockRouter },
                { provide: NotificationService, useValue: mockNotificationService },
                { provide: ActivatedRoute, useValue: { queryParamMap: of(convertToParamMap({ cityId: '1', from: '2024-05-15', to: '2024-05-20' })) } }
            ]
        }).compileComponents();

        mockRouter.navigate.and.returnValue(new Promise(() => true));
        mockGeographicalDataService.getCountries.and.returnValue(of([]));
        mockHotelService.searchHotels.and.returnValue(of([]));
        mockHotelService.bookHotel.and.returnValue(of({}));
        mockGeographicalDataService.getCountryByCityId.and.returnValue(of({
            id: 1,
            name: 'TestCountry',
            cities: [{
                id: 1,
                name: 'cityName'
            }]
        }));
        fixture = TestBed.createComponent(HotelsShellComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize component with correct default values', () => {
        expect(component.$hotels).toEqual(jasmine.any(Observable));
        expect(component.$country).toEqual(jasmine.any(Observable));
        expect(component.orderBy).toEqual(OrderBy.none);
    });

    it('should navigate to search results page when onSearchClick is called', fakeAsync(() => {
        component.onSearchClick();
        tick();
        expect(mockRouter.navigate).toHaveBeenCalledWith([], { queryParams: { cityId: 1, from: '2024-05-15', to: '2024-05-20' } });
    }));

    it('should call hotelService.bookHotel and notify success when onBookClicked is called', () => {
        const mockHotel: SearchHotelsQuerysResult = {
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
        };

        component.onBookClicked(mockHotel);
        expect(mockHotelService.bookHotel).toHaveBeenCalledWith(1, '2024-05-15', '2024-05-20');
        expect(mockNotificationService.notifySuccess).toHaveBeenCalledWith('Hotel booked.');
    });
});
