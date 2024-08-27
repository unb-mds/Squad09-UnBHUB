import Calltoaction from '../components/Landing/Calltoaction';
import Feature from '../components/Landing/feature';
import Hero from '../components/Landing/Hero';
import NavbarComponent2 from '../components/Landing/Navbar2';
import Functionalities from '../components/Landing/functionalities';

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
