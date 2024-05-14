import { DatesRange } from './dates-range';

describe('DatesRange', () => {
  let today: Date;

  beforeEach(() => {
    today = new Date('2024-05-14');
  });

  it('should create DatesRange instance with valid dates', () => {
    const datesRange = new DatesRange('2024-05-15', '2024-05-20', today);
    expect(datesRange.start).toEqual('2024-05-15');
    expect(datesRange.end).toEqual('2024-05-20');
  });

  it('should create DatesRange instance with null start and end dates if provided dates are invalid', () => {
    const datesRange = new DatesRange('invalid', '2024-05-20', today);
    expect(datesRange.start).toEqual('');
    expect(datesRange.end).toEqual('');
  });

  it('should update start date and set end date to null if start date is after end date', () => {
    const datesRange = new DatesRange('2024-05-15', '2024-05-20', today);
    datesRange.updateStart('2024-05-25');
    expect(datesRange.start).toEqual('2024-05-25');
    expect(datesRange.end).toEqual('');
  });

  it('should update end date and set start date to null if end date is before start date', () => {
    const datesRange = new DatesRange('2024-05-15', '2024-05-20', today);
    datesRange.updateEnd('2024-05-10');
    expect(datesRange.start).toEqual('');
    expect(datesRange.end).toEqual('2024-05-10');
  });

  it('should return minimum start date as today + 1 day', () => {
    const datesRange = new DatesRange('', '', today);
    expect(datesRange.minStart).toEqual('2024-05-15');
  });

  it('should return minimum end date as start date + 1 day if start date is set', () => {
    const datesRange = new DatesRange('2024-05-15', '', today);
    expect(datesRange.minEnd).toEqual('2024-05-16');
  });

  it('should return minimum end date as today + 2 days if start date is not set', () => {
    const datesRange = new DatesRange('', '', today);
    expect(datesRange.minEnd).toEqual('2024-05-16');
  });
});