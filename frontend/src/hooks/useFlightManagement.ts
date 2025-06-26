import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Flight, Reservation } from "@/types/interfaces";
import vooService from "@/services/voo-service";

export const useFlightManagement = () => {
  const router = useRouter();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await vooService.findVoos(null, null, null, null, null);
        const mappedFlights: Flight[] = (response.voos || []).map((v: any) => ({
          id: v.codigo,
          date: v.data.split("T")[0].split("-").reverse().join("/"),
          time: v.data.split("T")[1]?.substring(0, 5) || "",
          origin: v.aeroporto_origem.codigo,
          destination: v.aeroporto_destino.codigo,
          status: v.estado === "CONFIRMADO" || v.estado === "CANCELADO" || v.estado === "REALIZADO"
            ? v.estado
            : "CONFIRMADO",
          value: Number(v.valor),
          miles: 0,
        }));
        setFlights(mappedFlights);
      } catch (error) {
        console.error("Erro ao buscar voos:", error);
      }
    };
    fetchFlights();
  }, []);

  const getFlightsWithin48Hours = (flightsList: Flight[]) => {
    const now = new Date();
    const fortyEightHoursLater = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    const filteredFlights = flightsList.filter((flight) => {
      const [day, month, year] = flight.date.split("/").map(Number);
      const [hours, minutes] = flight.time.split(":").map(Number);
      const flightDate = new Date(year, month - 1, day, hours, minutes);
      return flightDate > now && flightDate <= fortyEightHoursLater;
    });

    // Ordena os voos por data/hora crescente
    return filteredFlights.sort((a, b) => {
      const [aDay, aMonth, aYear] = a.date.split("/").map(Number);
      const [aHours, aMinutes] = a.time.split(":").map(Number);
      const aDate = new Date(aYear, aMonth - 1, aDay, aHours, aMinutes);

      const [bDay, bMonth, bYear] = b.date.split("/").map(Number);
      const [bHours, bMinutes] = b.time.split(":").map(Number);
      const bDate = new Date(bYear, bMonth - 1, bDay, bHours, bMinutes);

      return aDate.getTime() - bDate.getTime();
    });
  };

  const handleConfirmBoarding = (flightId: string, reservationCode: string) => {
    const reservation = reservations.find(
      (r) => r.code === reservationCode && r.flightId === flightId
    );

    if (!reservation) {
      alert(
        "Erro: Código de reserva não encontrado ou não pertence a este voo."
      );
      return false;
    }

    if (reservation.status !== "CHECK-IN") {
      alert("Erro: A reserva não está no estado de CHECK-IN.");
      return false;
    }

    setReservations((prev) =>
      prev.map((r) =>
        r.id === reservation.id ? { ...r, status: "EMBARCADO" } : r
      )
    );

    alert("Embarque confirmado com sucesso!");
    router.push("/confirmacao-embarque");
    return true;
  };

  const handleCancelFlight = async (flightId: string) => {
    const flight = flights.find((f) => f.id === flightId);
    if (!flight || flight.status !== "CONFIRMADO") {
      alert("Erro: Apenas voos confirmados podem ser cancelados.");
      return false;
    }

    try {
      await vooService.mudarEstadoVoo(Number(flightId), "CANCELADO");
      setFlights((prev) =>
        prev.map((f) => (f.id === flightId ? { ...f, status: "CANCELADO" } : f))
      );
      setReservations((prev) =>
        prev.map((r) =>
          r.flightId === flightId ? { ...r, status: "CANCELADO VOO" } : r
        )
      );
      alert("Voo cancelado com sucesso!");
      return true;
    } catch (error) {
      alert("Erro ao cancelar voo!");
      return false;
    }
  };

  const handleCompleteFlight = async (flightId: string) => {
    try {
      await vooService.mudarEstadoVoo(Number(flightId), "REALIZADO");
      setFlights((prev) =>
        prev.map((f) =>
          f.id === flightId ? { ...f, status: "REALIZADO" } : f
        )
      );
      alert("Voo realizado com sucesso!");
      return true;
    } catch (error) {
      alert("Erro ao realizar voo!");
      return false;
    }
  };

  const upcomingFlights = getFlightsWithin48Hours(
    flights.filter((flight) => flight.status === "CONFIRMADO")
  );

  return {
    flights,
    reservations,
    upcomingFlights,
    handleConfirmBoarding,
    handleCancelFlight,
    handleCompleteFlight,
  };
};
