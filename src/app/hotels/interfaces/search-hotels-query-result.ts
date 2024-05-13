export interface SearchHotelsQuerysResult {
    id: number;
    name: string;
    country: string;
    city: string;
    rating: number;
    pricePerNight: number;
    totalPrice: number;
    totalNights: number;
    photoUrl: string;
    occupied: boolean;
}
