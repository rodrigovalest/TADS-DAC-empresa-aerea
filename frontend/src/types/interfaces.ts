export interface Flight {
    id: string;
    date: string;
    time: string;
    origin: string;
    destination: string;
    status: "CONFIRMADO" | "CANCELADO" | "REALIZADO";
  }
  
  export interface Reservation {
    id: string;
    flightId: string;
    status: "CHECK-IN" | "EMBARCADO" | "CANCELADO VOO" | "REALIZADA" | "NÃO REALIZADA";
    code: string;
  }