export interface Flight {
  id: string;
  date: string;
  time: string;
  origin: string;
  destination: string;
  status: "CONFIRMADO" | "CANCELADO" | "REALIZADO";
  value: number;
  miles: number;
}

export interface Reservation {
  id: string;
  flightId: string;
  status:
    | "CRIADO"
    | "CRIADA"
    | "CHECK-IN"
    | "EMBARCADO"
    | "CANCELADO VOO"
    | "REALIZADA"
    | "NÃO REALIZADA";
  code: string;
}

export default interface Employee {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  user: string;
  password: string;
}
