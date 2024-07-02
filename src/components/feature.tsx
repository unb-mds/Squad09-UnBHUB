export default function Feature() {
  return (
    <div className="surface-section text-center">
      <div className="mb-3 font-bold text-2xl">
        <span className="text-900">Um Produto, </span>
        <span className="text-primary ">Muitas Soluções</span>
      </div>
      <div className="text-700 text-sm mb-6">
        Essas são algumas das vantagens que você terá utilizando o UnBHub
      </div>
      <div className="grid">
        <div className="col-12 md:col-4 mb-4 px-5">
          <span className="p-3 shadow-2 mb-3 inline-block surface-card">
            <i className="pi pi-book text-4xl text-blue-500" />
          </span>
          <div className="text-900 mb-3 font-medium">Feito para Estudantes</div>
          <span className="text-700 text-sm line-height-3">
            Site feito por estudantes com proposta centrada em auxiliar os
            alunos da faculdade do Gama na organização de suas atividades
            acadêmicas.
          </span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
          <span className="p-3 shadow-2 mb-3 inline-block surface-card">
            <i className="pi pi-lock text-4xl text-blue-500" />
          </span>
          <div className="text-900 mb-3 font-medium">Seus Dados Protegidos</div>
          <span className="text-700 text-sm line-height-3">
            Utilizamos o Firebase como banco de dados, com tecnologias avançadas
            de criptografia e autenticação que garantem um armazenamento robusto
            e seguro das suas informações.
          </span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
          <span className="p-3 shadow-2 mb-3 inline-block surface-card">
            <i className="pi pi-check-circle text-4xl text-blue-500" />
          </span>
          <div className="text-900 mb-3 font-medium">Fácil de Usar</div>
          <span className="text-700 text-sm line-height-3">
            Nosso site foi projetado pensando na sua conveniência, com uma
            interface intuitiva e navegação simplificada, facilitando o acesso
            rápido a todas as funcionalidades e recursos.
          </span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
          <span className="p-3 shadow-2 mb-3 inline-block surface-card">
            <i className="pi pi-users text-4xl text-blue-500" />
          </span>
          <div className="text-900 mb-3 font-medium">Acesso gratuito</div>
          <span className="text-700 text-sm line-height-3">
            Crie sua conta gratuitamente em minutos com nosso processo rápido e
            direto, e tenha acesso imediato a todos os benefícios sem nenhum
            custo adicional.
          </span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
          <span className="p-3 shadow-2 mb-3 inline-block surface-card">
            <i className="pi pi-github text-4xl text-blue-500" />
          </span>
          <div className="text-900 mb-3 font-medium">Código Aberto</div>
          <span className="text-700 text-sm line-height-3">
            Nosso site é construído com código aberto, garantindo transparência
            e segurança, além de permitir contribuições da comunidade para um
            serviço mais confiável e robusto.{' '}
          </span>
        </div>
        <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
          <span className="p-3 shadow-2 mb-3 inline-block surface-card">

            <i className="pi pi-calendar text-4xl text-blue-500" />
          </span>
          <div className="text-900 mb-3 font-medium">
            Mantenha-se Atualizado
          </div>
          <span className="text-700 text-sm line-height-3">
            Nosso site ajuda você a organizar sua vida acadêmica, oferecendo
            lembretes e atualizações constantes sobre prazos, eventos e
            atividades importantes.
          </span>
        </div>
      </div>
    </div>
  );
}
