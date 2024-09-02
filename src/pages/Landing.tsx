import Calltoaction from '../components/Landing/Calltoaction';
import Feature from '../components/Landing/feature';
import Hero from '../components/Landing/Hero';
import NavbarComponent2 from '../components/Landing/Navbar2';

export default function LandingPage() {
  return (
    <div>
      <NavbarComponent2 />
      <Hero />
      <Feature />
      <Calltoaction />
    </div>
  );
}
