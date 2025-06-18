"use client"
import React, {useState, useEffect} from 'react';
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
import {api} from '@/server/api';
import Link from 'next/link';
import Footer from '@/components/footer';
import moment from 'moment';

type comprasProp = {
    parIdCompra: number; 
    parNroParcela: number; 
    parVctParcela: string; 
    parVlrCompra: number; 
    parStaParcela: string; 
    parTaxCompra: string; 
    parVlrParcela: number; 
    usrId: number; 
    usrNome: string; 
    cmpEmissao: string; 
    cmpQtdParcela: number; 
    cmpVlrCompra: number; 
    cnvId: number; 
    cnvNomFantasia: string;
}

export default function Dashboard(){
    const { data: session, status } = useSession();

    const [usrId, setUsrId] = useState('');
    const [usrNome, setUsrNome] = useState('');
    const [usrMatricula, setUsrMatricula] = useState('');
    const [usrSldDisponivel, setUsrSldDisponivel] = useState(0);
    const [usrStatus, setUsrStatus] = useState('');
    const [usrMes, setUsrMes] = useState('');
    const [usrAno, setUsrAno] = useState('');
    const [usrCartao, setUsrCartao] = useState('');
    const [compras, setCompras] = useState<Array<comprasProp>>([]);

    useEffect(() => {
        console.log("Status:", status);
        console.log("Session:", session);

        if (status === "authenticated") {
            if (session?.user?.cartao) {
                const carServ = session.user.cartao;
        
                api.get(`dadServ/${carServ}`)
                    .then(resp => {
                        const data = resp.data[0]; 
        
                        if (data) {
                            setUsrId(data.usrId);
                            setUsrCartao(data.usrCartao);
                            setUsrNome(data.usrNome);
                            setUsrMatricula(data.usrMatricula);
                            setUsrMes(data.usrMes);
                            setUsrAno(data.usrAno);
                            setUsrSldDisponivel(data.usrVlrDisponivel); 
                            setUsrStatus(data.usrStatus);
                        } else {
                            alert("Servidor não encontrado.");
                        }
                    })
                    .catch(() => {
                        alert("Falha no acesso ao servidor! Tente novamente.");
                    });
            } else {
                console.warn("Usuário autenticado, mas 'cartão' não está presente.");
            }
        }

        const id = session?.user.id;

        api.get(`ultCompras/${id}`)
            .then(res => {
                setCompras(res.data); 
            })
            .catch(() => {
                alert("Falha no acesso as compras do servidor! Tente novamente.");
            });

    }, [session, status]);

    return(
        <div className="flex-col justify-center w-full h-full bg-slate-500 dark:bg-black">
            <Navbar />  
            <div className='flex-col p-2 w-full h-full'>
                <div className='flex-col bg-slate-300 dark:bg-slate-800 rounded-md px-2 w-full h-full'>
                    <div className='flex-row '>
                        <span className='text-[12px] font-bold dark:text-blue-400'>ID Servidor(a):</span>
                        <span className='ml-2'>{usrCartao}-{usrId}-{usrMatricula}</span>
                    </div>
                    <div className='flex-row '>
                        <span className='text-[12px] font-bold dark:text-blue-400'>Servidor(a):</span>
                        <span className='ml-2'>{usrNome}</span>                    
                    </div>
                    <div className='flex-row '>
                        <span className='text-[12px] font-bold dark:text-blue-400'>Periodo:</span>
                        <span className='ml-2'>{usrMes} / {usrAno}</span> 
                    </div>
                    <div className='flex-row '>
                        <span className='text-[12px] font-bold dark:text-blue-400'>Saldo Disponivel:</span>
                        <span className='ml-2 font-bold text-green-700 dark:text-green-400'>
                            {new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2  }).format(usrSldDisponivel)}</span>                    
                    </div>  
                    <div className='flex-row '>
                        <span className='text-[12px] font-bold dark:text-blue-400'>Status:</span>
                        <span className='ml-2'>{usrStatus}</span>                      
                    </div>
                </div>  
                <div className='flex-col bg-slate-300 dark:bg-slate-800 rounded-md mt-5 px-2 w-full h-auto'>
                    <div className='flex-row mb-5 '>
                        <span className='ml-2 font-bold dark:text-blue-400'>Últimos Lançamentos:</span>
                    </div>
                    <div className="grid grid-cols-1 gap-1 md:grid-cols-4 md:gap-4 ml-1 px-0 py-2">            
                        {compras.map((item, idx) => {
                            return <Link key={idx} href={`#`} className="bg-[#38bdf8]/20 rounded overflow-hidden shadow-lg mb-1 hover:bg-[#38bdf8]/40" > 
                            <div className="flex flex-row items-start justify-between px-2">
                                <div className="flex flex-col items-start px-2 py-1 ">
                                    <span className='text-[12px] font-bold dark:text-blue-400'>Convênio</span>
                                    <div className="text-[12px] mb-0">{item.cnvNomFantasia}</div>
                                </div>
                            </div>
                            <div className="flex flex-row items-start justify-between px-2 py-0 ">
                                <div className="flex flex-col items-start px-2 py-1">
                                    <span className='text-[12px] font-bold dark:text-blue-400'>Data Compra</span>
                                    <div className="text-[12px] mb-0">{moment(item.cmpEmissao).format('L')}</div>
                                </div>
                                <div className="flex flex-col items-start px-2 py-1">
                                    <span className='text-[12px] font-bold'>Nº Compra</span>
                                    <div className="text-[12px] mb-0">{item.parIdCompra}</div>
                                </div>
                            </div>                                
                            <div className="flex flex-row items-start justify-between px-2">
                                <div className="flex flex-col items-start px-2 ">
                                    <span className='text-[12px] font-bold dark:text-blue-400'>Parcelas</span>
                                    <div className="text-[12px] mb-0">{item.cmpQtdParcela}</div>
                                </div>
                                <div className="flex flex-col items-start px-2 ">
                                    <span className='text-[12px] font-bold dark:text-blue-400'>Valor Compra</span>
                                    <div className="text-[12px] mb-0">
                                        {new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2  }).format(item.cmpVlrCompra)}                                     
                                    </div>
                                </div>
                            </div>                                                          
                            </Link>                  
                        })}
                    </div>
                </div>  
            </div>
            <Footer />    
        </div>
    )
}