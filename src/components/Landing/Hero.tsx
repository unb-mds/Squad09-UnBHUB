import { Button } from 'primereact/button';
import { Image } from 'primereact/image';

export default function Hero() {
  return (
    <div className="grid grid-nogutter surface-section text-800 justify-content-center align-items-center">
      <div className="col-12 md:col-6 flex align-items-center justify-content-center">
        <Image
          src="/images/planing.jpg"
          alt="Em Desenvolvimento"
          width="100%" // Ajuste para responsividade
          className="max-w-full"
        />
      </div>
      <div className="col-12 md:col-6 p-6 text-center md:text-left">
        <section>
          <span className="mt-6 block text-6xl font-bold mb-1">
            Venha fazer parte do <b className="text-6xl text-blue-900 mb-3">Unb</b><b className="text-6xl text-green-600 mb-3">Hub</b>
          </span>
          <div className="text-6xl text-primary font-bold mb-3">
            e aproveite todas as suas vantagens
          </div>
          <p className="mt-6 mb-4 text-700  text-xl line-height-3">
          O UnbHub é a solução ideal para manter sua vida acadêmica organizada. 
          Com ele, você gerencia suas tarefas, provas e matérias em um só lugar, sem perder prazos importantes. 
          Simplifique sua rotina universitária e alcance seus objetivos com mais eficiência!
          </p>

          <Button
            label="Saiba Mais"
            type="button"
            className="mt-6 mb-8 mr-3 ui-button-raised"
            onClick={() =>
              window.location.href = 'https://unb-mds.github.io/Squad09-UnBHUB/'
            }
          />
        </section>
      </div>
    </div>
  );
}
