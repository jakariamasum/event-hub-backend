export interface IEvent {
  title: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  joinedUsers?: string[];
  userId: string;
  attendeeCount?: number;
}

export interface PaginatedEvents {
  events: IEvent[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pageCount: number;
  };
}
