export default function Feature() {
  return (
    <div className="surface-section text-center">
      <div className="mb-3 font-bold text-2xl">
        <span className="text-900">Um Produto, </span>
        <span className="text-primary ">Muitas Soluções</span>
      </div>
      <div className="text-700 text-sm mb-6">
        Essas são algumas das vantagens que você terá ao usar o UnBHub
      </div>
      <div className="grid">
        <div className="col-12 md:col-4 mb-4 px-5">
          <span
            className="p-3 shadow-2 mb-3 inline-block surface-card"
            //style="border-radius: 10px"
          >
            <i className="pi pi-book text-4xl text-blue-500" />
          </span>
          <div className="text-900 mb-3 font-medium">Feito para Estudantes</div>
          <span className="text-700 text-sm line-height-3">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
          <span
            className="p-3 shadow-2 mb-3 inline-block surface-card"
            //style="border-radius: 10px"
          >
            <i className="pi pi-lock text-4xl text-blue-500" />
          </span>
          <div className="text-900 mb-3 font-medium">Seus Dados Protegidos</div>
          <span className="text-700 text-sm line-height-3">
            Risus nec feugiat in fermentum posuere urna nec. Posuere
            sollicitudin aliquam ultrices sagittis.
          </span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
          <span
            className="p-3 shadow-2 mb-3 inline-block surface-card"
            //style="border-radius: 10px"
          >
            <i className="pi pi-check-circle text-4xl text-blue-500" />
          </span>
          <div className="text-900 mb-3 font-medium">Fácil de Usar</div>
          <span className="text-700 text-sm line-height-3">
            Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat
            ac tincidunt vitae semper.
          </span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
          <span
            className="p-3 shadow-2 mb-3 inline-block surface-card"
            //style="border-radius: 10px"
          >
            <i className="pi pi-users text-4xl text-blue-500" />
          </span>
          <div className="text-900 mb-3 font-medium">Crie a Sua Conta</div>
          <span className="text-700 text-sm line-height-3">
            Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum
            tellus.
          </span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
          <span
            className="p-3 shadow-2 mb-3 inline-block surface-card"
            //style="border-radius: 10px"
          >
            <i className="pi pi-github text-4xl text-blue-500" />
          </span>
          <div className="text-900 mb-3 font-medium">Código Aberto</div>
          <span className="text-700 text-sm line-height-3">
            Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec
            adipiscing tristique risus nec feugiat.{' '}
          </span>
        </div>
        <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
          <span
            className="p-3 shadow-2 mb-3 inline-block surface-card"
            //style="border-radius: 10px"
          >
            <i className="pi pi-calendar text-4xl text-blue-500" />
          </span>
          <div className="text-900 mb-3 font-medium">
            Mantenha-se Atualizado
          </div>
          <span className="text-700 text-sm line-height-3">
            Mattis rhoncus urna neque viverra justo nec ultrices. Id cursus
            metus aliquam eleifend.
          </span>
        </div>
      </div>
    </div>
  );
}
