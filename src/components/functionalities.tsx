export default function Functionalities() {
  return (
    <div>
      <div className="mt-6 text-900 font-bold text-6xl mb-4 text-center text-primary">
        Análise de Projeto
      </div>
      <div className="text-700 text-xl mb-6 text-center line-height-3">
        O projeto foi desenvolvido com base nas necessidades dos alunos da
        Universidade de Brasília, com o intuito de facilitar o acesso a
        informações importantes para o dia a dia acadêmico.
      </div>

      <div className="grid">
        <div className="col-12 lg:col-4">
          <div className="p-3 h-full">
            <div
              className="shadow-2 p-3 h-full flex flex-column surface-card"
            >
              <div className="text-900 font-medium text-xl mb-2">
                Técnologias Utilizadas
              </div>

              <hr className="my-3 mx-0 border-top-1 border-bottom-none surface-border" />
              <div className="flex align-items-center">
                <span className="font-bold text-2xl text-900"></span>
                <span className="ml-2 font-medium text-600"></span>
              </div>
              <hr className="my-3 mx-0 border-top-1 border-bottom-none surface-border" />
              <ul className="list-none p-0 m-0 flex-grow-1">
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2" />
                  <span>Linguagens de Programação: Typescript, HTML, CSS</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2" />
                  <span>Prototipação: Figma</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2" />
                  <span>Framework Web: ReactJS</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2" />
                  <span>Banco de Dados: FireBase</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2" />
                  <span>
                    Bibliotecas: PrimeFlex, PrimeReact
                  </span>
                </li>
              </ul>
              <hr className="mb-3 mx-0 border-top-1 border-bottom-none surface-border mt-auto" />
            </div>
          </div>
        </div>

        <div className="col-12 lg:col-4">
          <div className="p-3 h-full">
            <div
              className="shadow-2 p-3 h-full flex flex-column surface-card"
            >
              <div className="text-900 font-medium text-xl mb-2">
                Funcionalidades
              </div>

              <hr className="my-3 mx-0 border-top-1 border-bottom-none surface-border" />
              <div className="flex align-items-center">
                <span className="font-bold text-2xl text-900"></span>
                <span className="ml-2 font-medium text-600"></span>
              </div>
              <hr className="my-3 mx-0 border-top-1 border-bottom-none surface-border" />
              <ul className="list-none p-0 m-0 flex-grow-1">
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2" />
                  <span>Sistema de SignIn e SignUp</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2" />
                  <span>Visualizar o Calendário Acadêmico</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2" />
                  <span>Visualizar o Cardápio do RU</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2" />
                  <span>Visualizar a Grade Horária</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2" />
                  <span>Visualizar matérias, provas e tarefas</span>
                </li>
              </ul>
              <hr className="mb-3 mx-0 border-top-1 border-bottom-none surface-border" />
            </div>
          </div>
        </div>

        <div className="col-12 lg:col-4">
          <div className="p-3 h-full">
            <div
              className="shadow-2 p-3 flex flex-column surface-card"
            >
              <div className="text-900 font-medium text-xl mb-2">
                Arquitetura
              </div>

              <hr className="my-3 mx-0 border-top-1 border-bottom-none surface-border" />
              <div className="flex align-items-center">
                <span className="font-bold text-2xl text-900"></span>
                <span className="ml-2 font-medium text-600"></span>
              </div>
              <hr className="my-3 mx-0 border-top-1 border-bottom-none surface-border" />
              <ul className="list-none p-0 m-0 flex-grow-1">
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2" />
                  <span>Frontend: PrimeFlex</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2" />
                  <span>Backend: NodeJS</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2" />
                  <span>Banco de Dados: FireBase(serverless)</span>
                </li>
                <li className="flex align-items-center mb-3">
                  <i className="pi pi-check-circle text-green-500 mr-2" />
                  <span>Serviços Externos: API do Site Oficial da Unb</span>
                </li>
              </ul>
              <hr className="mb-3 mx-0 border-top-1 border-bottom-none surface-border" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
