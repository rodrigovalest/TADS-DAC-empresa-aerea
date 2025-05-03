export interface Flight {
    id: string;
    code: string;
    dateTime: string;
    origin: string;
    destination: string;
    amountSpent: number;
    milesSpent: number;
    flightStatus: string;
  }