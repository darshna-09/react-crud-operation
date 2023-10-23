import { Route, Routes } from 'react-router-dom';
import './App.css';
import Create from './Components/Create';
import Read from './Components/Read';
import Edit from './Components/Edit';
function App() {
  return (
    <div className="container">
        {/* <Create/> */}
        <Routes>
            <Route path='/' element={<Read/>}></Route>
            <Route path='/create' element={<Create/>}></Route>
            <Route path='/edit' element={<Edit/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
