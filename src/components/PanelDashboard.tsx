import { Button } from 'primereact/button';

export default function PanelDashboardComponent() {
  return (
    <div className="flex flex-1 flex-column surface-50 gap-2 py-5 px-6 my-3 mx-3 align-items-center justify-content-center border-round-xl">
      <div className="flex flex-row">
        <div className="flex flex-column">
          <h2>Envolva-se entre em Grupos de Estudos e Monitoria!</h2>
          <p className="text-justify w-6">
            Explore seus interesses e conheça estudantes que pensam como você
            ingressando em um de nossos muitos clubes. Quer você goste de
            esportes, artes ou estudos, há um clube para você. Encontre sua
            comunidade!
          </p>
          <div className="w-3">
            <Button
              label="Saiba Mais!"
              icon="pi pi-arrow-right"
              iconPos="right"
              size="small"
            />
          </div>
        </div>
        <img src="/Students_darkbg.png" className="h-15rem"></img>
      </div>
    </div>
  );
}
