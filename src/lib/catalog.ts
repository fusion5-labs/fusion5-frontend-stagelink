export type Service = {
  id: string;
  listingId?: string;
  name: string;
  provider: string;
  detail: string;
  role: 'artist' | 'renter';
  rate: number;
  unit: 'hour' | 'event' | 'day';
  initials: string;
  capacity: number;
  available: boolean;
};

export type Availability = {
  days: number[];
  start: string;
  end: string;
  blocks: { id: string; date: string; start: string; end: string; reason: string }[];
};

export const defaultAvailability = (): Availability => ({
  days: [0, 1, 2, 3, 4, 5, 6],
  start: '00:00',
  end: '23:59',
  blocks: []
});

export const serviceIdFor = (listingId: string) =>
  ({ 'GIG-001': 'aria', 'EQ-001': 'pa', 'EQ-002': 'lights' }[listingId] ?? listingId);
