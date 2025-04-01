import React from 'react';
import '../../app/globals.css';
import Header from "../../components/Header"
import HeaderBanner from '@/components/HeaderBanner';
import MileageTable from '@/components/MileageTable';

const MileageHistoryPage: React.FC = () => {

    var transactions = [
        { code: "MIL456", transaction: "Saída", description: "CWB -> GRU", value: 4500, points: 5000, date: new Date() },
        { code: "MIL456", transaction: "Entrada", description: "Compra de milhas", value: 4500, points: 3500, date: new Date() },
        { code: "MII456", transaction: "Saída", description: "GRU -> ZWP", value: 5000, points: 1000, date: new Date() },
        { code: "09U76", transaction: "Entrada", description: "Cancelamento de passagem", value: 50, points: 5, date: new Date() },
        { code: "11Z23", transaction: "Saída", description: "Reembolso de passagem", value: 75, points: 7, date: new Date() },
    ];

    return (
        <div>
            <Header/>
            <HeaderBanner text="Verifique seu histórico de milhas aqui" />
            <div className="p-5 rounded-3xl border-3 w-[85vw] border-black mx-auto -mt-12 bg-white">
                <MileageTable transactions={transactions} />
            </div>
        </div>
    );
};

export default MileageHistoryPage;