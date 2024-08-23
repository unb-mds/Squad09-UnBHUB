import React from 'react';
import { Image } from 'primereact/image';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { classNames } from 'primereact/utils';
import { useLocation, Link } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { Divider } from 'primereact/divider';

// Estilos para o Sidebar e Conteúdo Principal
const sidebarStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '15rem', // Ajuste conforme necessário
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', // Sombra para destaque
  zIndex: 1000, // Garante que o sidebar fique acima do conteúdo principal
  overflowY: 'auto' // Adiciona rolagem se o conteúdo exceder a altura
};

const mainContentStyle = {
  marginLeft: '15rem', // Deve corresponder à largura do Sidebar
};

// Estilos CSS
const sidebarItemStyle = {
  padding: '1rem', // Aumenta o padding dos itens
  fontSize: '1rem', // Aumenta o tamanho da fonte dos itens
};

const smallTextStyle = {
  fontSize: '0.875rem', // Reduz o tamanho da fonte para textos pequenos
  paddingLeft: '1rem', // Ajusta o padding para o texto pequeno
};

export default function SideBarComponent() {
  const toast = React.useRef(null);
  const location = useLocation();

  const items: MenuItem[] = [
    {
      template: () => (
        <div>
          <span className="inline-flex align-items-center gap-1 px-2 py-0">
            <Image src="/images/logo.svg" alt="logo" width="60" height="60" />
            <span className="text-xl font-semibold">
              UnB<span className="text-primary">HUB</span>
            </span>
          </span>
          <Divider className='mb-3 mt-0' />
        </div>
      ),
    },
    {
      command: () => {
        toast.current.show({
          severity: 'info',
          summary: 'Info',
          detail: 'Item Selected',
          life: 3000,
        });
      },
      template: (options) => (
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button
              onClick={(e) => options.onClick(e)}
              style={sidebarItemStyle}
              className={classNames(
                options.className,
                'w-full p-link flex align-items-center text-color hover:surface-200 border-noround',
                { 'surface-300': location.pathname === '/' }
              )}
            >
              <i className="pi pi-fw pi-home mr-2"></i>
              <span>DashBoard</span>
            </button>
          </Link>
          <Divider className='mb-4 mt-3' />
          <span className="block " style={smallTextStyle}>Acadêmico</span>
          <Link to="/CalendarPage" style={{ textDecoration: 'none' }}>
            <button
              onClick={(e) => options.onClick(e)}
              style={sidebarItemStyle}
              className={classNames(
                options.className,
                'w-full p-link flex align-items-center text-color hover:surface-200 border-noround',
                { 'surface-300': location.pathname === '/CalendarPage' }
              )}
            >
              <i className="pi pi-fw pi-calendar mr-2"></i>
              <span>Calendário</span>
            </button>
          </Link>
          <Link to="/Subjects" style={{ textDecoration: 'none' }}>
            <button
              onClick={(e) => options.onClick(e)}
              style={sidebarItemStyle}
              className={classNames(
                options.className,
                'w-full p-link flex align-items-center text-color hover:surface-200 border-noround',
                { 'surface-300': location.pathname === '/Subjects' }
              )}
            >
              <i className="pi pi-fw pi-bookmark mr-2" />
              <span>Matérias</span>
            </button>
          </Link>
          <Link to="/Tasks" style={{ textDecoration: 'none' }}>
            <button
              onClick={(e) => options.onClick(e)}
              style={sidebarItemStyle}
              className={classNames(
                options.className,
                'w-full p-link flex align-items-center text-color hover:surface-200 border-noround',
                { 'surface-300': location.pathname === '/Tasks' }
              )}
            >
              <i className="pi pi-fw pi-clipboard mr-2" />
              <span>Tarefas</span>
            </button>
          </Link>
          <Link to="/Library" style={{ textDecoration: 'none' }}>
            <button
              onClick={(e) => options.onClick(e)}
              style={sidebarItemStyle}
              className={classNames(
                options.className,
                'w-full p-link flex align-items-center text-color hover:surface-200 border-noround',
                { 'surface-300': location.pathname === '/Library' }
              )}
            >
              <i className="pi pi-fw pi-book mr-2"></i>
              <span>Biblioteca</span>
            </button>
          </Link>
          <Link to="/Menu" style={{ textDecoration: 'none' }}>
            <button
              onClick={(e) => options.onClick(e)}
              style={sidebarItemStyle}
              className={classNames(
                options.className,
                'w-full p-link flex align-items-center text-color hover:surface-200 border-noround',
                { 'surface-300': location.pathname === '/Menu' }
              )}
            >
              <i className="pi pi-fw pi-th-large mr-2"></i>
              <span>Cardápio</span>
            </button>
          </Link>
          <Link to="/Exams" style={{ textDecoration: 'none' }}>
            <button
              onClick={(e) => options.onClick(e)}
              style={sidebarItemStyle}
              className={classNames(
                options.className,
                'w-full p-link flex align-items-center text-color hover:surface-200 border-noround',
                { 'surface-300': location.pathname === '/Exams' }
              )}
            >
              <i className="pi pi-fw pi-calendar-times mr-2"></i>
              <span>Provas</span>
            </button>
          </Link>
          <Link to="/Events" style={{ textDecoration: 'none' }}>
            <button
              onClick={(e) => options.onClick(e)}
              style={sidebarItemStyle}
              className={classNames(
                options.className,
                'w-full p-link flex align-items-center text-color hover:surface-200 border-noround',
                { 'surface-300': location.pathname === '/Events' }
              )}
            >
              <i className="pi pi-fw pi-calendar-plus mr-2"></i>
              <span>Eventos</span>
            </button>
          </Link>
          <Divider className='mb-4 mt-3' />
          <span className="block" style={smallTextStyle}>Configurações</span>
          <Link to="/Settings" style={{ textDecoration: 'none' }}>
            <button
              onClick={(e) => options.onClick(e)}
              style={sidebarItemStyle}
              className={classNames(
                options.className,
                'w-full p-link flex align-items-center text-color hover:surface-200 border-noround',
                { 'surface-300': location.pathname === '/Settings' }
              )}
            >
              <i className="pi pi-fw pi-cog mr-2"></i>
              <span>Configurações</span>
            </button>
          </Link>
          <Link to="/Notifications" style={{ textDecoration: 'none' }}>
            <button
              onClick={(e) => options.onClick(e)}
              style={sidebarItemStyle}
              className={classNames(
                options.className,
                'w-full p-link flex align-items-center text-color hover:surface-200 border-noround',
                { 'surface-300': location.pathname === '/Notifications' }
              )}
            >
              <i className="pi pi-fw pi-bell mr-2"></i>
              <span>Notificações</span>
            </button>
          </Link>
          <Link to="/Profile" style={{ textDecoration: 'none' }}>
            <button
              onClick={(e) => options.onClick(e)}
              style={sidebarItemStyle}
              className={classNames(
                options.className,
                'w-full p-link flex align-items-center text-color hover:surface-200 border-noround',
                { 'surface-300': location.pathname === '/User' }
              )}
            >
              <i className="pi pi-fw pi-user mr-2"></i>
              <span>Usuário</span>
            </button>
          </Link>
          <Divider className='mb-4'/>
          <button
            className="w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround mb-4"
            onClick={() => auth.signOut()}
          >
            <i className="pi pi-fw pi-power-off mr-2"></i>
            <span>Sair</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={sidebarStyle}>
        <Menu model={items} className="w-full" />
      </div>
      <div style={mainContentStyle}>
        {/* Conteúdo principal */}
      </div>
    </div>
  );
}
