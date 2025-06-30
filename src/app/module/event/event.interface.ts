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
