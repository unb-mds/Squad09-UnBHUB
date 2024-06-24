import Calltoaction from '../components/Calltoaction';
import Feature from '../components/feature';
import Hero from '../components/Hero';
import NavbarComponent2 from '../components/Navbar2';
import Functionalities from '../components/functionalities';

export default function LandingPage() {
  return (
    <div>
      <NavbarComponent2 />
      <Hero />
      <Feature />
      <Functionalities />
      <Calltoaction />
    </div>
  );
}
