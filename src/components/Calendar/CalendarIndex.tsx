import DataTarefas from './DataTarefas';
import DataProvas from './DataProvas';
import DataImportante from './DataImportante';
import DataLivros from './DataLivros';

export default function Index() {
  return (
    <div>
      <div className="text-700 text-xl mb-6 text-center line-height-3 mt-2">
        O calendário foi desenvolvido com base nas necessidades dos alunos da
        Universidade de Brasília, com o intuito de facilitar o acesso a datas
        importantes para o semestre acadêmico.
      </div>

      <div className="grid">
        <DataImportante />

        <DataProvas />

        <DataTarefas />

        <DataLivros />
      </div>
    </div>
  );
}
