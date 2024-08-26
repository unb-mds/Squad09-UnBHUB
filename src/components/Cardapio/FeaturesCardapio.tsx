export default function FeaturesCardapio() {
  return (
    <div className="surface-section text-center">
      <div className="mb-3 font-bold text-2xl mt-6">
        <span className="text-900">Um Restaurante, </span>
        <span className="text-primary ">Muitas Opções</span>
      </div>
      <div className="text-700 text-sm mb-6">
        Esses são alguns dos benifícios do restaurante universitário
      </div>
      <div className="grid">
        <div className="col-12 md:col-4 mb-4 px-5">
          <span className="p-3 shadow-2 mb-3 inline-block surface-card">
            <i className="pi pi-verified text-4xl text-blue-500" />
          </span>
          <div className="text-900 mb-3 font-medium">Qualidade Garantida</div>
          <span className="text-700 text-sm line-height-3">
            O cardápio oferecido tem padrão estabelecido em contrato e sua
            execução é fiscalizada pela equipe de fiscais técnicos do RU. Os
            cardápios do RU são elaborados por nutricionistas da empresa
            contratada e são fiscalizados por equipe técnica de servidores da
            UnB.
          </span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
          <span className="p-3 shadow-2 mb-3 inline-block surface-card">
            <i className="pi pi-globe text-4xl text-blue-500" />
          </span>
          <div className="text-900 mb-3 font-medium">Diversas Opções</div>
          <span className="text-700 text-sm line-height-3">
            Todas as refeições contemplam opções veganas. Preparações que
            contenham leite de origem animal, ovo, glúten, pimenta, sementes
            oleaginosas e/ou frutos do mar em seus ingredientes são
            identificadas na distribuição aos usuários.
          </span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
          <span className="p-3 shadow-2 mb-3 inline-block surface-card">
            <i className="pi pi-truck text-4xl text-blue-500" />
          </span>
          <div className="text-900 mb-3 font-medium">Sustentabilidade</div>
          <span className="text-700 text-sm line-height-3">
            Todo o processo de produção e distribuição de refeições considera os
            princípios básicos de sustentabilidade, como a redução do
            desperdício
          </span>
        </div>
      </div>
    </div>
  );
}
