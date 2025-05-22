"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../app/globals.css';
import Header from "../../components/Header";
import HeaderBanner from '@/components/HeaderBanner';
import TripsTable from '@/components/TripsTable';
import { Autocomplete, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Flight } from '@/types/interfaces';

const NewTripPage: React.FC = () => {
    const router = useRouter();

    const allTrips: Flight[] = [
        { id: "1", date: new Date('2022-05-12').toISOString(), time: '12:00', origin: 'Curitiba', destination: 'Guarulhos', value: 2500, status: "CONFIRMADO", miles: 400 },
        { id: "2", date: new Date('2023-06-05').toISOString(), time: '15:45', origin: 'São Paulo', destination: 'Rio de Janeiro', value: 1000, status: "CONFIRMADO", miles: 350 },
        { id: "3", date: new Date('2023-11-23').toISOString(), time: '19:58', origin: 'Florianópolis', destination: 'Belo Horizonte', value: 9000, status: "CONFIRMADO", miles: 950 },
        { id: "4", date: new Date('2023-01-10').toISOString(), time: '08:30', origin: 'Porto Alegre', destination: 'Curitiba', value: 1200, status: "CONFIRMADO", miles: 300 },
        { id: "5", date: new Date('2023-02-15').toISOString(), time: '14:00', origin: 'Brasília', destination: 'São Paulo', value: 1800, status: "CONFIRMADO", miles: 500 },
        { id: "6", date: new Date('2023-03-20').toISOString(), time: '10:15', origin: 'Recife', destination: 'Salvador', value: 900, status: "CONFIRMADO", miles: 150 },
        { id: "7", date: new Date('2023-04-25').toISOString(), time: '16:45', origin: 'Fortaleza', destination: 'Natal', value: 700, status: "CONFIRMADO", miles: 120 },
        { id: "8", date: new Date('2023-05-30').toISOString(), time: '11:00', origin: 'Manaus', destination: 'Belém', value: 1500, status: "CONFIRMADO", miles: 480 },
        { id: "9", date: new Date('2023-06-15').toISOString(), time: '13:30', origin: 'Rio de Janeiro', destination: 'Brasília', value: 2000, status: "CONFIRMADO", miles: 450 },
        { id: "10", date: new Date('2023-07-20').toISOString(), time: '09:45', origin: 'São Paulo', destination: 'Curitiba', value: 1100, status: "CONFIRMADO", miles: 280 },
        { id: "11", date: new Date('2023-08-25').toISOString(), time: '18:00', origin: 'Guarulhos', destination: 'Florianópolis', value: 1300, status: "CONFIRMADO", miles: 300 },
        { id: "12", date: new Date('2023-09-10').toISOString(), time: '07:30', origin: 'Belo Horizonte', destination: 'Rio de Janeiro', value: 950, status: "CONFIRMADO", miles: 200 },
        { id: "13", date: new Date('2023-10-15').toISOString(), time: '15:00', origin: 'Salvador', destination: 'Recife', value: 850, status: "CONFIRMADO", miles: 180 },
        { id: "14", date: new Date('2023-11-20').toISOString(), time: '12:15', origin: 'Natal', destination: 'Fortaleza', value: 750, status: "CONFIRMADO", miles: 160 },
        { id: "15", date: new Date('2023-12-05').toISOString(), time: '17:30', origin: 'Belém', destination: 'Manaus', value: 1600, status: "CONFIRMADO", miles: 500 },
        { id: "16", date: new Date('2024-01-10').toISOString(), time: '10:00', origin: 'Curitiba', destination: 'São Paulo', value: 1400, status: "CONFIRMADO", miles: 260 },
        { id: "17", date: new Date('2024-02-15').toISOString(), time: '14:30', origin: 'Rio de Janeiro', destination: 'Guarulhos', value: 1250, status: "CONFIRMADO", miles: 230 },
        { id: "18", date: new Date('2024-03-20').toISOString(), time: '09:00', origin: 'Brasília', destination: 'Belo Horizonte', value: 1700, status: "CONFIRMADO", miles: 400 },
        { id: "19", date: new Date('2024-04-25').toISOString(), time: '16:00', origin: 'Florianópolis', destination: 'Porto Alegre', value: 1000, status: "CONFIRMADO", miles: 250 },
        { id: "20", date: new Date('2025-08-30').toISOString(), time: '11:45', origin: 'São Paulo', destination: 'Rio de Janeiro', value: 1150, status: "CONFIRMADO", miles: 300 },
    ];

    const originLocations = Array.from(new Set(allTrips.map(trip => trip.origin))).sort();
    const destinationLocations = Array.from(new Set(allTrips.map(trip => trip.destination))).sort();

    const dateAtual = new Date();
    const futureTrips = allTrips.filter(trip => new Date(trip.date) > dateAtual);
    const [origin, setOrigin] = useState<string | null>(null);
    const [destination, setDestination] = useState<string | null>(null);
    const [filteredTrips, setFilteredTrips] = useState(futureTrips.slice(0, 20));

    const handleFilterTrips = () => {
        const filtered = allTrips.filter(trip => {
            return (
                (!origin || trip.origin === origin) &&
                (!destination || trip.destination === destination) &&
                new Date(trip.date) > dateAtual
            );
        });
        setFilteredTrips(filtered);
    };

    const handleRowClick = (trip: Flight) => {
        const query = new URLSearchParams({
            id: trip.id,
            date: trip.date,
            time: trip.time,
            origin: trip.origin,
            destination: trip.destination,
            value: trip.value.toString(),
            miles: trip.miles.toString(),
            status: trip.status,
        }).toString();

        router.push(`/new-trip/details?${query}`);
    };

    return (
        <div className="mb-10">
            <Header />
            <HeaderBanner htmlContent="Sua <span class='text-[#FF3D00] font-bold'>viagem</span> dos sonhos está a um <span class='text-[#FF3D00] font-bold'>clique</span> de <span class='text-[#FF3D00] font-bold'>distância</span>!" />
            <div className="-mt-12 flex gap-4 p-5 max-w-[95vw] mx-auto bg-[#FF3D00] rounded-md">
                <div className="bg-white rounded-sm w-2/5">
                    <Autocomplete
                        options={originLocations}
                        value={origin}
                        onChange={(event, newValue) => setOrigin(newValue)}
                        renderInput={(params) => <TextField {...params} label="Origem" variant="filled" />}
                        className="w-100%"
                    />
                </div>

                <div className="bg-white rounded-sm w-2/5">
                    <Autocomplete
                        options={destinationLocations}
                        value={destination}
                        onChange={(event, newValue) => setDestination(newValue)}
                        renderInput={(params) => <TextField {...params} label="Destino" variant="filled" />}
                        className="w-100%"
                    />
                </div>

                <div className="flex items-center w-1/5">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFilterTrips}
                        style={{ 
                            backgroundColor: '#FFFFFF',
                            color: '#000000',
                            height: '100%',
                        }}
                        fullWidth
                        startIcon={<SearchIcon />}
                    >
                        Buscar Viagem
                    </Button>
                </div>
            </div>
            <div className="p-5 rounded-3xl border-3 w-[85vw] border-black mx-auto mt-12 bg-white">
                <TripsTable trips={filteredTrips} onRowClick={handleRowClick} />
            </div>
        </div>
    );
};

export default NewTripPage;
