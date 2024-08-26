import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase'; 

export default function NavbarComponent() {
  const [userName, setUserName] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    // Obter o nome do usuário
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = doc(db, 'Users', user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const data = userSnapshot.data().UserInfo;
          setUserName(data.userName);
        }
      }
    });

    // Obter a data atual formatada
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      weekday: 'long'
    };
    const formattedDate = date.toLocaleDateString('pt-BR', options).replace(/^\w/, (c) => c.toUpperCase());
    setCurrentDate(formattedDate);

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-content-between align-items-center my-1 mx-3 border-round-xl">
      <div className="flex justify-content-start px-2">
        <h2 className="m-0">👋 Bem-Vindo{userName ? `, ${userName}!` : '!'}</h2>
      </div>
      <div className="flex align-items-center">
        <span className="text-sm">{currentDate}</span>
      </div>
    </div>
  );
}
