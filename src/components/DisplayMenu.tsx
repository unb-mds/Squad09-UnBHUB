import React, { useState, useEffect } from 'react';
import { fetchItems } from '../functions/FirebaseService';

export default function DisplayMenuComponent() {
  const [links, setLinks] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    const fetchAndSetItems = async () => {
      const items = await fetchItems();
      setLinks(items);
    };

    fetchAndSetItems();
  }, []);

  return (
    <div className="flex justify-content-between align-items-center surface-50 my-1 mx-3 border-round-xl">
      <div className="flex justify-content-between w-9 px-6">
        <div className="flex flex-column my-2">
          <span className="text-sm my-2">
            Abaixo estão os links para os cardápios do Restaurante
            Universitário:
          </span>
          <span className="text-sm my-2">
            Clicando no link da semana desejada você será redirecionado para o
            pdf do RU onde poderá visualizar o cardápio de café da manha, almoço
            e jantar do dia de segunda a sexta.
          </span>
          {links.length > 0 ? (
            links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="text-sm text-primary my-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            ))
          ) : (
            <span className="text-sm my-2">Nenhum item disponível</span>
          )}
        </div>
      </div>
    </div>
  );
}
