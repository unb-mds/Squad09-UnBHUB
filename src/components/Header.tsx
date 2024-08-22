import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { auth, db } from '../../config/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function GeneralHeader() {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = doc(db, 'Users', user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const data = userSnapshot.data().UserInfo;
          setProfileImageUrl(data.profileImageUrl || null);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleProfileClick = () => {
    navigate('./Profile');
  };

  return (
    <div className="flex align-items-center justify-content-between border-round-lg p-2" style={{ height: '60px', width: '100%' }}>
      <div className="flex justify-content-between px-6">
      </div>
      <div className="flex align-items-center" style={{ marginLeft: 'auto' }}>
        <a href="./Messages">
          <Button
            icon="pi pi-bell p-overlay-badge"
            rounded
            text
            size="small"
            badge="" // sinaliza o numero de notificacoes
            badgeClassName="p-badge-danger"
            link
          />
        </a>
        <a href="./Messages">
          <Button
            icon="pi pi-inbox p-overlay-badge"
            rounded
            text
            size="small"
            link
          />
        </a>
        <Button className="" rounded text onClick={handleProfileClick}>
          <Avatar
            image={profileImageUrl || undefined} // Se o usuário tiver imagem, mostre, caso contrário, use o ícone
            icon={!profileImageUrl ? 'pi pi-user' : undefined} // Exibe o ícone 'pi-user' se não houver imagem
            size="small"
            className="mr-2"
            shape="circle"
          />
        </Button>
      </div>
    </div>
  );
}
