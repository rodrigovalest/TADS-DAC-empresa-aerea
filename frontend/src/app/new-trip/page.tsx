"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../app/globals.css';
import Header from "@/components/Header";
import HeaderBanner from '@/components/HeaderBanner';
import TripsTable from '@/components/TripsTable';
import { Autocomplete, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useFindVoos } from '@/hooks/useFindVoos';
import { useFindAeroportos } from '@/hooks/useFindAeroportos';
import IVooResponse from '@/models/response/voo-response';
import IAeroportoResponse from '@/models/response/aeroporto-response';


const NewTripPage: React.FC = () => {
  const router = useRouter();

  const { mutate: onFindVoos, isPending } = useFindVoos();
  const { data: aeroportos = [], isLoading: loadingAeroportos } = useFindAeroportos();

  const [origin, setOrigin] = useState<IAeroportoResponse | null>(null);
  const [destination, setDestination] = useState<IAeroportoResponse | null>(null);
  const [filteredTrips, setFilteredTrips] = useState<IVooResponse[]>([]);

  useEffect(() => {
    onFindVoos(
      {
        data: null,
        origem: null,
        destino: null,
        inicio: null,
        fim: null,
      },
      {
        onSuccess: (data) => setFilteredTrips(data.voos),
      }
    );
  }, [onFindVoos]);

  const handleFilterTrips = () => {
    onFindVoos(
      {
        data: null,
        origem: origin?.codigo ?? null,
        destino: destination?.codigo ?? null,
        inicio: null,
        fim: null,
      },
      {
        onSuccess: (data) => {
          setFilteredTrips(data.voos);
        },
      }
    );
  };

  const handleRowClick = (voo: IVooResponse) => {
    const query = new URLSearchParams({
      codigo: voo.codigo,
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
            options={aeroportos}
            loading={loadingAeroportos}
            value={origin}
            onChange={(event, newValue) => setOrigin(newValue)}
            getOptionLabel={(option) => `${option.nome} (${option.cidade} - ${option.uf})`}
            renderInput={(params) => <TextField {...params} label="Origem" variant="filled" />}
          />
        </div>

        <div className="bg-white rounded-sm w-2/5">
          <Autocomplete
            options={aeroportos}
            loading={loadingAeroportos}
            value={destination}
            onChange={(event, newValue) => setDestination(newValue)}
            getOptionLabel={(option) => `${option.nome} (${option.cidade} - ${option.uf})`}
            renderInput={(params) => <TextField {...params} label="Destino" variant="filled" />}
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
            disabled={isPending || loadingAeroportos}
          >
            {isPending ? "Buscando..." : "Buscar Viagem"}
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
