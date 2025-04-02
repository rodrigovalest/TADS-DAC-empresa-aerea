export interface Reservation {
  code: string;
  dateTime: string; // ISO string para data/hora
  origin: string;
  destination: string;
  amountSpent: number; // Valor gasto
  milesSpent: number; // Milhas gastas
  flightStatus: string; // Estado do voo (ex: Confirmado, Cancelado, etc.)
}
