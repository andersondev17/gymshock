
import Footer from '@/components/layout/Footer';
import { BlurFade } from '@/components/magicui/blur-fade';
import Navbar from '../components/layout/Navbar';
import ExcerciseDetail from './excercise/ExcerciseDetail';
import Home from './Home';

const BLUR_FADE_DELAY = 0.04;

export default function App() {
  return (
    <>
    <div className=" min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <Navbar />

      <section id="home" className="pt-20">
        <Home />
      </section>

      <section id = "excercise" className="pt-20">

      <BlurFade delay={BLUR_FADE_DELAY}>
        <ExcerciseDetail />
      </BlurFade>
      </section>
      
    </div>
    <Footer />
    </>
  );
}
