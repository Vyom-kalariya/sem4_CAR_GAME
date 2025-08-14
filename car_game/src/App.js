import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './Loader';
import Racing from './Racing';
import Home from './Home';
import Signup from './Signup';


//pass -- Vyom --> something2
function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Signup />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/racing" element={<Racing />} />
      </Routes>
    </Router>
  );
}

export default App;
