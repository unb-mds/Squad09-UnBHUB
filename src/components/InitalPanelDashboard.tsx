import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { ProgressBar } from 'primereact/progressbar';

export default function InitialPanel() {
  return (
    <div className="flex flex-column surface-50 gap-2">
      <div className="flex flex-row ">
        <div className="flex justify-content-between w-9">
          <h1>👋 Bem-Vindo!</h1>
          <b className="pt-4">data</b>
        </div>
        <div className="flex flex-column pt-1 w-3 pl-3">
          <p className="text-lg">
            Semestre <b>3</b> de 10
          </p>
          <ProgressBar value={50}></ProgressBar>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex flex-column">
          <h2>Envolva-se-Entre em Grupos de Estudos e Monitoria!</h2>
          <h3 className="text-justify">
            Explore seus interesses e conheça estudantes que pensam como você
            ingressando em um de nossos muitos clubes. Quer você goste de
            esportes, artes ou estudos, há um clube para você. Encontre sua
            comunidade!
          </h3>
          <div className="w-3">
            <Button
              label="Saiba Mais!"
              icon="pi pi-arrow-right"
              iconPos="right"
              size="small"
            />
          </div>
        </div>
        <img src="/public/Students_darkbg.png" className="h-15rem"></img>

        <div className="flex justify-item-center align-center h-15rem pl-3 w-3">
          <Calendar inline />
        </div>
      </div>
    </div>
  );
}
