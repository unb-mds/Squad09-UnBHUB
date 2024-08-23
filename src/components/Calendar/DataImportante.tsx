import { useEffect, useState } from 'react';
import { db } from '../../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function DataImportante() {
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
    <div className="col-12 lg:col-3">
      <div className="p-1 h-full">
        <div className="shadow-2 p-3 h-full flex flex-column surface-card">
          <div className="flex align-items-center mb-2">
            <span className="text-900 font-medium text-xl overflow-hidden break-word">
              🟡 Datas importantes
            </span>
          </div>

          <hr className="my-3 mx-0 border-top-1 border-bottom-none surface-border" />
          <ul className="list-none p-0 m-0 flex-grow-1">
            {dates.map((date, index) => (
              <li
                key={index}
                className="flex align-items-center mb-3 overflow-hidden break-word"
              >
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
  );
}
