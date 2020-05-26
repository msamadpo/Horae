export type CalendarEvent = {
  id: string;
  name: string;
  description: string;
  date: string;
  duration: number;
  location: string;
};

export type Calendar = {
  id: string;
  title: string;
  settings: {
    color: string;
  };
  events: CalendarEvent[];
};
