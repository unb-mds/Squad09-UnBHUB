import BackgroungImage from './Backgroung';
import FeaturesCardapio from './FeaturesCardapio';
import LinksCardapio from './LinksCardapio';

export default function DisplayMenuComponent() {
  return (
    <div className="flex justify-content-between align-items-center my-1 mx-3 border-round-xl">
      <div className="flex justify-content-between  px-6">
        <div className="flex flex-column my-2">
          <BackgroungImage />
          <FeaturesCardapio />
          <span className="text-sm my-6 ml-3">
            Abaixo estão os links para o cardápio da semana do Restaurante
            Universitário:
          </span>
          <LinksCardapio />
        </div>
      </div>
    </div>
  );
}
