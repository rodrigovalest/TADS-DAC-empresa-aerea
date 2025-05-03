import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Flight, Reservation } from "@/types/interfaces";

export const useFlightManagement = () => {
  const router = useRouter();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const mockFlights: Flight[] = [
      { id: "1", date: "24/04/2025", time: "08:00", origin: "Aeroporto de Curitiba", destination: "Aeroporto de São Paulo/Guarulhos ", status: "CONFIRMADO" },
      { id: "2", date: "24/04/2025", time: "10:00", origin: "Aeroporto do Rio de Janeiro/Galeão", destination: "Aeroporto de Curitiba", status: "CONFIRMADO" },
      { id: "3", date: "24/04/2025", time: "14:00", origin: "Aeroporto Salgado Filho", destination: "Aeroporto do Rio de Janeiro/Galeão", status: "CONFIRMADO" },
      { id: "4", date: "24/04/2025", time: "18:00", origin: "Aeroporto de São Paulo/Guarulhos ", destination: "Aeroporto de Curitiba", status: "CONFIRMADO" },
      { id: "5", date: "25/04/2025", time: "08:00", origin: "Aeroporto de Curitiba", destination: "Aeroporto de São Paulo/Guarulhos ", status: "CONFIRMADO" },
      { id: "6", date: "25/04/2025", time: "10:00", origin: "Aeroporto do Rio de Janeiro/Galeão", destination: "Aeroporto de Curitiba", status: "CONFIRMADO" },
      { id: "7", date: "25/04/2025", time: "14:00", origin: "Aeroporto Salgado Filho", destination: "Aeroporto do Rio de Janeiro/Galeão", status: "CONFIRMADO" },
      { id: "8", date: "25/04/2025", time: "18:00", origin: "Aeroporto de São Paulo/Guarulhos ", destination: "Aeroporto de Curitiba", status: "CONFIRMADO" },
      { id: "9", date: "26/04/2025", time: "08:00", origin: "Aeroporto de Curitiba", destination: "Aeroporto de São Paulo/Guarulhos ", status: "CONFIRMADO" },
      { id: "10", date: "26/04/2025", time: "10:00", origin: "Aeroporto do Rio de Janeiro/Galeão", destination: "Aeroporto de Curitiba", status: "CONFIRMADO" },
      { id: "11", date: "26/04/2025", time: "14:00", origin: "Aeroporto Salgado Filho", destination: "Aeroporto do Rio de Janeiro/Galeão", status: "CONFIRMADO" },
      { id: "12", date: "26/04/2025", time: "18:00", origin: "Aeroporto de São Paulo/Guarulhos ", destination: "Aeroporto de Curitiba", status: "CONFIRMADO" },
      { id: "13", date: "27/04/2025", time: "08:00", origin: "Aeroporto de Curitiba", destination: "Aeroporto de São Paulo/Guarulhos ", status: "CONFIRMADO" },
      { id: "14", date: "27/04/2025", time: "10:00", origin: "Aeroporto do Rio de Janeiro/Galeão", destination: "Aeroporto de Curitiba", status: "CONFIRMADO" },
      { id: "15", date: "27/04/2025", time: "14:00", origin: "Aeroporto Salgado Filho", destination: "Aeroporto do Rio de Janeiro/Galeão", status: "CONFIRMADO" },
      { id: "16", date: "27/04/2025", time: "18:00", origin: "Aeroporto de São Paulo/Guarulhos ", destination: "Aeroporto de Curitiba", status: "CONFIRMADO" }
    ];

    const mockReservations: Reservation[] = [
      { id: "r1", flightId: "1", status: "CHECK-IN", code: "ABC123" },
      { id: "r2", flightId: "2", status: "CHECK-IN", code: "DEF456" },
      { id: "r3", flightId: "3", status: "CHECK-IN", code: "GHI789" },
      { id: "r4", flightId: "4", status: "CHECK-IN", code: "JKL012" }
    ];

    setFlights(mockFlights);
    setReservations(mockReservations);
  }, []);

  const getFlightsWithin48Hours = (flightsList: Flight[]) => {
    const now = new Date();
    const fortyEightHoursLater = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    const filteredFlights = flightsList.filter(flight => {
      const [day, month, year] = flight.date.split('/').map(Number);
      const [hours, minutes] = flight.time.split(':').map(Number);
      const flightDate = new Date(year, month - 1, day, hours, minutes);
      return flightDate > now && flightDate <= fortyEightHoursLater;
    });

    // Ordena os voos por data/hora crescente
    return filteredFlights.sort((a, b) => {
      const [aDay, aMonth, aYear] = a.date.split('/').map(Number);
      const [aHours, aMinutes] = a.time.split(':').map(Number);
      const aDate = new Date(aYear, aMonth - 1, aDay, aHours, aMinutes);

      const [bDay, bMonth, bYear] = b.date.split('/').map(Number);
      const [bHours, bMinutes] = b.time.split(':').map(Number);
      const bDate = new Date(bYear, bMonth - 1, bDay, bHours, bMinutes);

      return aDate.getTime() - bDate.getTime();
    });
  };

  const handleConfirmBoarding = (flightId: string, reservationCode: string) => {
    const reservation = reservations.find(r => r.code === reservationCode && r.flightId === flightId);

    if (!reservation) {
      alert("Erro: Código de reserva não encontrado ou não pertence a este voo.");
      return false;
    }

    if (reservation.status !== "CHECK-IN") {
      alert("Erro: A reserva não está no estado de CHECK-IN.");
      return false;
    }

    setReservations(prev =>
      prev.map(r => r.id === reservation.id ? { ...r, status: "EMBARCADO" } : r)
    );

    alert("Embarque confirmado com sucesso!");
    router.push('/confirmacao-embarque');
    return true;
  };

  const handleCancelFlight = (flightId: string) => {
    const flight = flights.find(f => f.id === flightId);
    if (!flight || flight.status !== "CONFIRMADO") {
      alert("Erro: Apenas voos confirmados podem ser cancelados.");
      return false;
    }

    setFlights(prev => prev.map(f => f.id === flightId ? { ...f, status: "CANCELADO" } : f));
    setReservations(prev =>
      prev.map(r => r.flightId === flightId ? { ...r, status: "CANCELADO VOO" } : r)
    );

    alert("Voo cancelado com sucesso!");
    return true;
  };

  const handleCompleteFlight = (flightId: string) => {
    const flight = flights.find(f => f.id === flightId);
    if (!flight || flight.status !== "CONFIRMADO") {
      alert("Erro: Apenas voos confirmados podem ser realizados.");
      return false;
    }

    setFlights(prev => prev.map(f => f.id === flightId ? { ...f, status: "REALIZADO" } : f));
    setReservations(prev =>
      prev.map(r => {
        if (r.flightId !== flightId) return r;
        if (r.status === "EMBARCADO") return { ...r, status: "REALIZADA" };
        if (r.status === "CHECK-IN") return { ...r, status: "NÃO REALIZADA" };
        return r;
      })
    );

    alert("Voo realizado com sucesso!");
    return true;
  };

  const upcomingFlights = getFlightsWithin48Hours(
    flights.filter(flight => flight.status === "CONFIRMADO")
  );

  return {
    flights,
    reservations,
    upcomingFlights,
    handleConfirmBoarding,
    handleCancelFlight,
    handleCompleteFlight
  };
};