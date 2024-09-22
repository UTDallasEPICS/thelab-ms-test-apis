export type UserStore = {
    id: number;
    jwt: string;
}[]

export type EventStore = {
    id: number;
    name: string;
    description: string;
    start: number;
    end: number;
    membersOnly: boolean;
    totalSeats: number;
    availableSeats: number;
  }[];

  export type ErrorResponse = {
    error: string;
  }