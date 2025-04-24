"use client";

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import '../../../app/globals.css';
import Header from "../../../components/Header";
import HeaderBanner from '@/components/HeaderBanner';
import { MenuItem, Select, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const NewTripDetailsPage: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const origin = searchParams.get('origin') || 'Origem não especificada';
    const destination = searchParams.get('destination') || 'Destino não especificado';
    const price = parseFloat(searchParams.get('value') || '0');
    const miles = searchParams.get('miles') || 'Milhas não especificadas';

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Data inválida';
        return date.toLocaleDateString('pt-BR');
    };

    const formatTime = (timeString: string) => {
        if (!timeString) return 'Horário inválido';
        const [hours, minutes] = timeString.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes)) return 'Horário inválido';
        const period = hours < 12 ? 'manhã' : 'tarde';
        return `${timeString} (${period})`;
    };

    const departureDate = formatDate(searchParams.get('date') || '');
    const departureTime = formatTime(searchParams.get('time') || '');

    const options = Array.from({ length: 10 }, (_, i) => ({
        value: i + 1,
        label: `${i + 1} passage${i > 0 ? 'ns' : 'm'}`,
    }));

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [milesToUse, setMilesToUse] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleMilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, Math.min(Number(e.target.value), totalMiles)); // Ensure valid range
        setMilesToUse(value.toString());
    };

    const generateReservationCode = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const randomLetters = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
        const randomNumbers = Array.from({ length: 3 }, () => numbers[Math.floor(Math.random() * numbers.length)]).join('');
        return `${randomLetters}${randomNumbers}`;
    };

    const handlePurchase = () => {
        const reservationCodes = Array.from({ length: quantity }, generateReservationCode);
        alert(`Passagem comprada com sucesso!\nCódigos de reserva: ${reservationCodes.join(', ')}`);
        router.push('/cliente-landing-page');
    };

    const totalPrice = price * quantity;
    const totalMiles = totalPrice / 5;
    const remainingPrice = totalPrice - (Number(milesToUse) * 5); // 1 point = 5 reais

    return (
        <div className="mb-10">
            <Header />
            <HeaderBanner htmlContent="Sua <span class='text-[#FF3D00] font-bold'>viagem</span> dos sonhos está a um <span class='text-[#FF3D00] font-bold'>clique</span> de <span class='text-[#FF3D00] font-bold'>distância</span>!" />
            <div className="-mt-12 flex gap-4 p-5 max-w-[95vw] mx-auto bg-[#FF3D00] rounded-md align-middle items-center">
                <div className="text-white text-lg w-1/3 flex justify-evenly">
                    <span className="font-bold">Origem: </span>{origin}
                </div>

                <div className="text-white text-4xl font-bold w-1/3 flex justify-center">
                    →
                </div>

                <div className="text-white text-lg w-1/3 flex justify-evenly">
                    <span className="font-bold">Destino: </span>{destination}
                </div>
            </div>
            <div className="flex flex-wrap justify-evenly text-2xl p-5 rounded-3xl border-3 w-[85vw] border-black mx-auto mt-12 bg-white"
                style={{ fontFamily: "Pathway Gothic One, sans-serif" }}>
                <div className="flex justify-between items-center w-full mb-4">
                    <span>Data do embarque: {departureDate}</span>
                    <span>Valor da passagem: R$ {price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center w-full mb-4">
                    <span>Horário de embarque: {departureTime}</span>
                    <div>
                        <Select
                            displayEmpty
                            className="text-black"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        >
                            <MenuItem value="" disabled>
                                Selecione a quantidade de passagens
                            </MenuItem>
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="flex justify-between items-center w-full mb-4">
                    <div>
                        <span>Valor total: </span>
                        <span>R$ {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span>Valor em milhas: </span>
                        <span>&nbsp;{totalMiles.toFixed(0)} Pontos</span>
                    </div>
                </div>
                <button
                    className="hover:cursor-pointer bg-[#FF3D00] text-white px-4 py-2 rounded w-full"
                    onClick={handleOpen}
                >
                    Realizar a compra
                </button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        padding: '20px',
                        borderRadius: '20px',
                        backgroundColor: '#FF3D00',
                        color: 'white',
                    },
                }}
            >
                <DialogTitle style={{ textAlign: 'center' }}>
                    Digite a quantidade de milhas que deseja usar
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={milesToUse}
                        onChange={handleMilesChange}
                        placeholder="Quantidade de milhas"
                        inputProps={{ min: 0, max: totalMiles }}
                        style={{ backgroundColor: 'white', borderRadius: '5px' }}
                    />
                    <div className="flex justify-between mt-4">
                        <div>
                            <span className="font-bold">Valor a ser pago:</span>
                            <div>R$ {Math.max(remainingPrice, 0).toFixed(2)}</div>
                        </div>
                        <div>
                            <span className="font-bold">Quantidade de passagens:</span>
                            <div>{quantity} passagem{quantity > 1 ? 's' : ''}</div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <span><span className="font-bold">Data do embarque:</span> {departureDate}</span>
                        <br />
                        <span><span className="font-bold">Horário de embarque:</span> {departureTime}</span>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        style={{ backgroundColor: '#8B0000', color: 'white' }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handlePurchase}
                        style={{ backgroundColor: '#4CAF50', color: 'white' }}
                    >
                        Comprar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NewTripDetailsPage;