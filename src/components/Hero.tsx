import { Button } from 'primereact/button';

export default function Hero() {
  return (
    <div className="grid grid-nogutter surface-section text-800 justify-content-center ">
      <div className="col-12 md:col-6 p-6 text-center md:text-center flex align-items-center justify-content-center">
        <section>
          <span className="mt-6 block text-6xl font-bold mb-1">
            Venha fazer parte do UnbHub{' '}
          </span>
          <div className="text-6xl text-primary font-bold mb-3">
            e aproveite todas as suas vantagens
          </div>
          <p className="mt-6 mb-4 text-700 line-height-3">
            A arquitetura de nosso site é projetada para oferecer uma plataforma
            robusta, escalável e segura para os estudantes da UnB. Com
            componentes bem definidos e uma abordagem centrada no usuário,
            estamos confiantes de que nossa plataforma atenderá às necessidades
            dos usuários e proporcionará uma experiência excepcional.
          </p>

          <Button
            value="Saiba Mais"
            type="button"
            className="mt-6 mb-8 mr-3 ui-button-raised"
          >
            Saiba Mais
          </Button>
        </section>
      </div>
    </div> // Add a closing curly brace here
  );
}
