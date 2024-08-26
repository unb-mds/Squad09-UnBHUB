import { useEffect, useState } from 'react';
import { fetchItems } from '../../functions/Cardapio/fetchGama';

export default function LinksCardapioGama() {
  const [links, setLinks] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    const fetchAndSetItems = async () => {
      const items = await fetchItems();
      setLinks(items);
    };

    fetchAndSetItems();
  }, []);

  return (
    <div className="col-12 lg:col-3">
      <div className="p-1 h-full">
        <div className="shadow-2 p-3 h-full flex flex-column surface-card">
          <div className="text-900 font-medium text-xl mb-2 overflow-hidden break-word">
            Gama:
          </div>

          <hr className="my-3 mx-0 border-top-1 border-bottom-none surface-border" />
          <div className="flex align-items-center"></div>

          <ul className="list-none p-0 m-0 flex-grow-1">
            {links.length > 0 ? (
              links.map((link) => (
                <li
                  key={link.name}
                  className="flex align-items-center mb-3 overflow-hidden break-word"
                >
                  <i className="pi pi-angle-right mr-2 text-green-500" />
                  <a
                    href={link.url}
                    className="text-sm text-primary my-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                </li>
              ))
            ) : (
              <li className="flex align-items-center mb-3 overflow-hidden break-word">
                <span className="text-sm my-2">Nenhum item disponível</span>
              </li>
            )}
          </ul>

          <hr className="mb-3 mx-0 border-top-1 border-bottom-none surface-border mt-auto" />
        </div>
      </div>
    </div>
  );
}
