import { BrowserRouter } from 'react-router-dom';
import '../src/custom-styles/generic-styles.css'
import Router from './core/Router';

function App() {
  return (
      <BrowserRouter>  
          <Router />
      </BrowserRouter>  
  );
}

export default App;
