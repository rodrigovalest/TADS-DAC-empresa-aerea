"use client";

import React, { useState } from 'react';
import '../../app/globals.css';
import Header from "../../components/Header";
import HeaderBanner from '@/components/HeaderBanner';
import TripsTable from '@/components/TripsTable';
import { Autocomplete, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const NewTripPage: React.FC = () => {
    const allTrips = [
        { date: new Date('2022-05-12'), time: '12:00', origin: 'Curitiba', destination: 'Guarulhos', value: 2500 },
        { date: new Date('2023-06-05'), time: '15:45', origin: 'São Paulo', destination: 'Rio de Janeiro', value: 1000 },
        { date: new Date('2023-11-23'), time: '19:58', origin: 'Florianópolis', destination: 'Belo Horizonte', value: 9000 },
        { date: new Date('2023-01-10'), time: '08:30', origin: 'Porto Alegre', destination: 'Curitiba', value: 1200 },
        { date: new Date('2023-02-15'), time: '14:00', origin: 'Brasília', destination: 'São Paulo', value: 1800 },
        { date: new Date('2023-03-20'), time: '10:15', origin: 'Recife', destination: 'Salvador', value: 900 },
        { date: new Date('2023-04-25'), time: '16:45', origin: 'Fortaleza', destination: 'Natal', value: 700 },
        { date: new Date('2023-05-30'), time: '11:00', origin: 'Manaus', destination: 'Belém', value: 1500 },
        { date: new Date('2023-06-15'), time: '13:30', origin: 'Rio de Janeiro', destination: 'Brasília', value: 2000 },
        { date: new Date('2023-07-20'), time: '09:45', origin: 'São Paulo', destination: 'Curitiba', value: 1100 },
        { date: new Date('2023-08-25'), time: '18:00', origin: 'Guarulhos', destination: 'Florianópolis', value: 1300 },
        { date: new Date('2023-09-10'), time: '07:30', origin: 'Belo Horizonte', destination: 'Rio de Janeiro', value: 950 },
        { date: new Date('2023-10-15'), time: '15:00', origin: 'Salvador', destination: 'Recife', value: 850 },
        { date: new Date('2023-11-20'), time: '12:15', origin: 'Natal', destination: 'Fortaleza', value: 750 },
        { date: new Date('2023-12-05'), time: '17:30', origin: 'Belém', destination: 'Manaus', value: 1600 },
        { date: new Date('2024-01-10'), time: '10:00', origin: 'Curitiba', destination: 'São Paulo', value: 1400 },
        { date: new Date('2024-02-15'), time: '14:30', origin: 'Rio de Janeiro', destination: 'Guarulhos', value: 1250 },
        { date: new Date('2024-03-20'), time: '09:00', origin: 'Brasília', destination: 'Belo Horizonte', value: 1700 },
        { date: new Date('2024-04-25'), time: '16:00', origin: 'Florianópolis', destination: 'Porto Alegre', value: 1000 },
        { date: new Date('2024-05-30'), time: '11:45', origin: 'São Paulo', destination: 'Rio de Janeiro', value: 1150 },
    ];

    const originLocations = Array.from(new Set(allTrips.map(trip => trip.origin))).sort();
    const destinationLocations = Array.from(new Set(allTrips.map(trip => trip.destination))).sort();

    const [origin, setOrigin] = useState<string | null>(null);
    const [destination, setDestination] = useState<string | null>(null);
    const [filteredTrips, setFilteredTrips] = useState(allTrips.slice(0, 20));

    const handleFilterTrips = () => {
        const filtered = allTrips.filter(trip => {
            return (
                (!origin || trip.origin === origin) &&
                (!destination || trip.destination === destination)
            );
        });
        setFilteredTrips(filtered);
    };

    return (
        <div>
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
                <TripsTable trips={filteredTrips} />
            </div>
        </div>
    );
};

export default NewTripPage;