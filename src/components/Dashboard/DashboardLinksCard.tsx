import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { fetchItems as fetchGamaItems } from '../../functions/Cardapio/fetchGama';
import { fetchItems as fetchPlanaltinaItems } from '../../functions/Cardapio/fetchPlanaltina';
import { fetchItems as fetchFazendaItems } from '../../functions/Cardapio/fetchFazenda';
import { fetchItems as fetchDarcyItems } from '../../functions/Cardapio/fetchDarcy';

export default function DashboardLinksCard() {
  const [gamaLinks, setGamaLinks] = useState<{ name: string; url: string }[]>(
    []
  );
  const [planaltinaLinks, setPlanaltinaLinks] = useState<
    { name: string; url: string }[]
  >([]);
  const [fazendaLinks, setFazendaLinks] = useState<
    { name: string; url: string }[]
  >([]);
  const [darcyLinks, setDarcyLinks] = useState<{ name: string; url: string }[]>(
    []
  );

  useEffect(() => {
    const fetchAndSetGamaItems = async () => {
      const items = await fetchGamaItems();
      setGamaLinks(items);
    };

    const fetchAndSetPlanaltinaItems = async () => {
      const items = await fetchPlanaltinaItems();
      setPlanaltinaLinks(items);
    };

    const fetchAndSetFazendaItems = async () => {
      const items = await fetchFazendaItems();
      setFazendaLinks(items);
    };

    const fetchAndSetDarcyItems = async () => {
      const items = await fetchDarcyItems();
      setDarcyLinks(items);
    };

    fetchAndSetGamaItems();
    fetchAndSetPlanaltinaItems();
    fetchAndSetFazendaItems();
    fetchAndSetDarcyItems();
  }, []);

  return (
    <div>
      <Card className="mb-3" style={{ maxHeight: '210px', overflowY: 'auto', maxWidth: '300px', border: '1px solid var(--gray-300)' }}>
        <div className="p-2 h-full flex flex-column" style={{ marginBottom: '-1rem', marginTop: '-1rem' }}>
          <div className="text-800 font-medium text-sm mb-2 overflow-hidden break-word">
            Gama:
          </div>
          <ul className="list-none p-0 m-0 flex-grow-1">
            {gamaLinks.length > 0 ? (
              gamaLinks.map((link) => (
                <li
                  key={link.name}
                  className="flex align-items-center mb-3 overflow-hidden break-word px-3"
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
  
          <div className="text-800 font-medium text-sm mb-2 overflow-hidden break-word">
            Planaltina:
          </div>
          <ul className="list-none p-0 m-0 flex-grow-1">
            {planaltinaLinks.length > 0 ? (
              planaltinaLinks.map((link) => (
                <li
                  key={link.name}
                  className="flex align-items-center mb-3 overflow-hidden break-word px-3"
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
  
          <div className="text-800 font-medium text-sm mb-2 overflow-hidden break-word">
            Fazenda:
          </div>
          <ul className="list-none p-0 m-0 flex-grow-1">
            {fazendaLinks.length > 0 ? (
              fazendaLinks.map((link) => (
                <li
                  key={link.name}
                  className="flex align-items-center mb-3 overflow-hidden break-word px-3"
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
  
          <div className="text-800 font-medium text-sm mb-2 overflow-hidden break-word">
            Darcy:
          </div>
          <ul className="list-none p-0 m-0 flex-grow-1">
            {darcyLinks.length > 0 ? (
              darcyLinks.map((link) => (
                <li
                  key={link.name}
                  className="flex align-items-center mb-3 overflow-hidden break-word px-3"
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
        </div>
      </Card>
    </div>
  );
}
