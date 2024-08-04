export default function Stats() {
  return (
    <div className="surface-ground px-4 py-5 md:px-6 lg:px-8">
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow-2 p-3 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Matérias Finalizadas
                </span>
                <div className="text-900 font-medium text-xl">3</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-check-square text-blue-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow-2 p-3 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Tarefas Realizadas
                </span>
                <div className="text-900 font-medium text-xl">5</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-orange-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-check-square text-orange-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow-2 p-3 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Notificações
                </span>
                <div className="text-900 font-medium text-xl">10</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-inbox text-cyan-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow-2 p-3 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Tempo para o fim do Semestre
                </span>
                <div className="text-900 font-medium text-xl">152 dias</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-purple-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-calendar text-purple-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
