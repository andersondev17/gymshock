
import Footer from '@/components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import ExcerciseDetail from './excercise/ExcerciseDetail';
import Home from './Home';

export default function App() {
  return (
    <div className=" min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <Navbar />
      <Home />
      <ExcerciseDetail />
      <Footer />
    </div>
  );
}
