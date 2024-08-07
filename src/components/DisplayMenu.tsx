import { useEffect, useState } from 'react';
import { fetchItems } from '../functions/FirebaseService';
import BackgroungImage from './Backgroung';

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
      <div className="flex justify-content-between  px-6">
        <div className="flex flex-column my-2">
          <span className="text-sm my-4">
            Abaixo está o link para o cardápio do Restaurante Universitário:
          </span>
          <BackgroungImage />
          <span className="text-sm my-2">
            O cardápio oferecido tem padrão estabelecido em contrato e sua
            execução é fiscalizada pela equipe de fiscais técnicos do RU. Os
            cardápios do RU são elaborados por nutricionistas da empresa
            contratada e são fiscalizados por equipe técnica de servidores da
            UnB. Todas as refeições contemplam opções veganas. Preparações que
            contenham leite de origem animal, ovo, glúten, pimenta, sementes
            oleaginosas e/ou frutos do mar em seus ingredientes são
            identificadas na distribuição aos usuários. O cumprimento da
            legislação vigente é objeto de fiscalização do contrato. O
            porcionamento da refeição é adequado, atendendo as especificações
            contratuais. Todo o processo de produção e distribuição de refeições
            considera os princípios básicos de sustentabilidade. Os grupos de
            acesso ao RU são definidos pela Resolução do CAD 27/2018.
          </span>
          <span className="text-sm my-4">
            Informamos que situações alheias ao planejamento podem levar a
            alteração de cardápio sem aviso prévio.
          </span>
          <span className="text-sm">Gama:</span>
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
