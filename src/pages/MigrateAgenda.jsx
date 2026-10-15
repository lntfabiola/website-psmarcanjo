import React, { useState } from 'react';
import { db } from '../services/firebaseConnection';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { eventosDB } from '../data/eventos';

const MigrateAgenda = () => {
    const [status, setStatus] = useState('Aguardando...');
    const [loading, setLoading] = useState(false);

    const handleMigrate = async () => {
        setLoading(true);
        setStatus('Verificando banco de dados...');
        try {
            const snapshot = await getDocs(collection(db, 'agenda_eventos'));
            if (!snapshot.empty) {
                setStatus('ATENÇÃO: A coleção "agenda_eventos" já possui dados. Não é seguro migrar novamente para evitar duplicação. Se quiser limpar e refazer, exclua os dados no Console do Firebase primeiro.');
                setLoading(false);
                return;
            }

            setStatus(`Iniciando migração em lote de ${eventosDB.length} eventos...`);

            // Firebase permite até 500 por batch
            const CHUNK_SIZE = 400;
            const chunks = [];
            for (let i = 0; i < eventosDB.length; i += CHUNK_SIZE) {
                chunks.push(eventosDB.slice(i, i + CHUNK_SIZE));
            }

            let totalInserido = 0;
            for (let c = 0; c < chunks.length; c++) {
                const batch = writeBatch(db);
                for (const evt of chunks[c]) {
                    const ref = doc(collection(db, 'agenda_eventos'));
                    batch.set(ref, {
                        data: evt.data,
                        titulo: evt.titulo,
                        tipo: evt.tipo || 'comum',
                        hora: evt.hora || '',
                        local: evt.local || ''
                    });
                    totalInserido++;
                }
                await batch.commit();
                setStatus(`Lote ${c + 1}/${chunks.length} concluído — ${totalInserido}/${eventosDB.length} eventos salvos...`);
            }

            setStatus(`✅ Migração concluída com sucesso! ${totalInserido} eventos foram adicionados ao Firebase.`);
        } catch (error) {
            console.error(error);
            setStatus(`❌ Erro na migração: ${error.message}`);
        }
        setLoading(false);
    };

    return (
        <div className="p-12 text-center pt-32">
            <h1 className="text-2xl font-bold mb-4">Migração da Agenda para o Firebase</h1>
            <p className="mb-6 text-gray-600">Clique no botão abaixo apenas UMA VEZ para copiar os eventos estáticos para o banco de dados.</p>

            <button
                onClick={handleMigrate}
                disabled={loading}
                className="bg-parish-terracotta text-white px-6 py-3 rounded font-bold shadow disabled:opacity-50"
            >
                {loading ? 'Processando...' : 'Iniciar Migração'}
            </button>

            <div className="mt-8 p-4 bg-gray-100 rounded text-gray-800 font-mono text-sm max-w-xl mx-auto whitespace-pre-wrap">
                {status}
            </div>
        </div>
    );
};

export default MigrateAgenda;

