import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Index() {
  const [dates, setDates] = useState<{ event: string; description: string }[]>(
    []
  );

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const docRef = doc(db, 'APIs', 'Calendar');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && data.content) {
            setDates(data.content);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados do Firestore: ', error);
      }
    };

    fetchDates();
  }, []);

  return (
    <div>
      <div className="text-700 text-xl mb-6 text-center line-height-3 mt-2">
        O calendário foi desenvolvido com base nas necessidades dos alunos da
        Universidade de Brasília, com o intuito de facilitar o acesso a datas
        importantes para o semestre acadêmico.
      </div>

      <div className="grid">
        <div className="col-12 lg:col-4">
          <div className="p-3 h-full">
            <div className="shadow-2 p-3 h-full flex flex-column surface-card">
              <div className="flex align-items-center mb-2">
                <span className="text-900 font-medium text-xl">
                  🟡 Datas importantes
                </span>
              </div>

              <hr className="my-3 mx-0 border-top-1 border-bottom-none surface-border" />
              <ul className="list-none p-0 m-0 flex-grow-1">
                {dates.map((date, index) => (
                  <li key={index} className="flex align-items-center mb-3">
                    <i className="pi pi-angle-right text-green-500 mr-2" />
                    <span>
                      {date.event} {date.description}
                    </span>
                  </li>
                ))}
              </ul>
              <hr className="mb-3 mx-0 border-top-1 border-bottom-none surface-border mt-auto" />
            </div>
          </div>
        </div>

        <div className="col-12 lg:col-4">
          <div className="p-3 h-full">
            <div className="shadow-2 p-3 h-full flex flex-column surface-card">
              <div className="text-900 font-medium text-xl mb-2">
                🔴 Datas de Provas
              </div>

              <hr className="my-3 mx-0 border-top-1 border-bottom-none surface-border" />
              <div className="flex align-items-center">
                <span className="font-bold text-2xl text-900"></span>
                <span className="ml-2 font-medium text-600"></span>
              </div>
              <hr className="my-3 mx-0 border-top-1 border-bottom-none surface-border" />
              <ul className="list-none p-0 m-0 flex-grow-1">
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-angle-right text-green-500 mr-2" />
                  <span>Sem informações disponíveis</span>
                </li>
              </ul>
              <hr className="mb-3 mx-0 border-top-1 border-bottom-none surface-border mt-auto" />
            </div>
          </div>
        </div>

        <div className="col-12 lg:col-4">
          <div className="p-3 h-full">
            <div className="shadow-2 p-3 h-full flex flex-column surface-card">
              <div className="text-900 font-medium text-xl mb-2">
                🔵 Datas de Tarefas
              </div>

              <hr className="my-3 mx-0 border-top-1 border-bottom-none surface-border" />
              <div className="flex align-items-center">
                <span className="font-bold text-2xl text-900"></span>
                <span className="ml-2 font-medium text-600"></span>
              </div>
              <hr className="my-3 mx-0 border-top-1 border-bottom-none surface-border" />
              <ul className="list-none p-0 m-0 flex-grow-1">
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-angle-right text-green-500 mr-2" />
                  <span>Sem informações disponíveis</span>
                </li>
              </ul>
              <hr className="mb-3 mx-0 border-top-1 border-bottom-none surface-border mt-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
