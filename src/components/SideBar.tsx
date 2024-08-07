import React from 'react';
import { Image } from 'primereact/image';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { classNames } from 'primereact/utils';
import { useLocation, Link } from 'react-router-dom';
import { auth } from '../../config/firebase';

export default function SideBarComponent() {
  const toast = React.useRef(null);
  const location = useLocation();

  const items: MenuItem[] = [
    {
      template: () => {
        return (
          <span className="inline-flex align-items-center gap-1 px-2 py-2">
            <Image src="/images/logo.svg" alt="logo" width="60" height="60" />
            <span className="text-xl font-semibold">
              UnB<span className="text-primary">HUB</span>
            </span>
          </span>
        );
      },
    },
    {
      separator: true,
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
      template: (options) => {
        return (
          <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button
                onClick={(e) => options.onClick(e)}
                className={classNames(
                  options.className,
                  'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround',
                  { 'surface-300': location.pathname === '/' }
                )}
              >
                <i className="pi pi-fw pi-home mr-2"></i>
                <span>DashBoard</span>
              </button>
            </Link>
            <Link to="/CalendarPage" style={{ textDecoration: 'none' }}>
              <button
                onClick={(e) => options.onClick(e)}
                className={classNames(
                  options.className,
                  'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround',
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
                className={classNames(
                  options.className,
                  'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround',
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
                className={classNames(
                  options.className,
                  'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround',
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
                className={classNames(
                  options.className,
                  'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround',
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
                className={classNames(
                  options.className,
                  'w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround',
                  { 'surface-300': location.pathname === '/Menu' }
                )}
              >
                <i className="pi pi-fw pi-th-large mr-2"></i>
                <span>Cardápio</span>
              </button>
            </Link>
            <button
              className="w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround"
              onClick={() => auth.signOut()}
            >
              <i className="pi pi-fw pi-power-off mr-2"></i>
              <span>Sair</span>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="card flex">
      <Menu model={items} className="w-full md:w-15rem min-h-screen" />
    </div>
  );
}
