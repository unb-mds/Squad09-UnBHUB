import { useEffect, useState } from 'react';
import { db } from '../../../config/firebase'; // importe seu arquivo de configuração do Firebase
import { doc, getDoc } from 'firebase/firestore';

export default function Footer() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchUrl = async () => {
      const docRef = doc(db, 'APIs', 'Calendar');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUrl(docSnap.data().url);
      } else {
        console.log('No such document!');
      }
    };

    fetchUrl();
  }, []);

  return (
    <div
      className="flex justify-content-between align-items-center  my-1 mx-3 border-round-xl"
      style={{ minHeight: '150px', position: 'relative' }}
    >
      <div
        className="text-blue-600 font-bold mb-3"
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          maxWidth: '50%', // Ajusta a largura máxima para evitar ultrapassar
          overflow: 'hidden', // Oculta o texto que ultrapassar o contêiner
          textOverflow: 'ellipsis', // Adiciona '...' quando o texto é cortado
          whiteSpace: 'nowrap', // Evita quebra de linha
        }}
      >
        <a
          href="https://github.com/unb-mds/Squad09-UnBHUB"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-blue-600"
        >
          <i className="pi pi-github" />
          &#160;CRIADO POR SQUAD 9
        </a>
      </div>
      <div
        className="text-blue-600 font-bold mb-3"
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          maxWidth: '50%', // Ajusta a largura máxima para evitar ultrapassar
          overflow: 'hidden', // Oculta o texto que ultrapassar o contêiner
          textOverflow: 'ellipsis', // Adiciona '...' quando o texto é cortado
          whiteSpace: 'nowrap', // Evita quebra de linha
        }}
      >
        Informações retiradas de:{' '}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-blue-600"
        >
          {url}
        </a>
      </div>
    </div>
  );
}
