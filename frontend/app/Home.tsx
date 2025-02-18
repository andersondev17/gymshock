import Excercises from '../components/Excercises';
import HeroBanner from '../components/HeroBanner';
import SearchExcercises from '../components/SearchExcercises';

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <SearchExcercises />
      <Excercises />
    </div>
  )
}

export default Home