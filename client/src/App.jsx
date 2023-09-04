import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextWrapper } from "./context/GlobalContext";
import { PublicLayout } from './layout/PublicLayout';
import { Home } from './pages/Home';
import { Page404 } from './pages/Page404';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { UserLayout } from './layout/UserLayout';
import { Account } from './pages/Account';

function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route Component={PublicLayout}>
            <Route index path='/' element={<Home />}></Route>
            <Route path='/registracija' element={<Register />}></Route>
            <Route path='/prisijungimas' element={<Login />}></Route>
          </Route>
          <Route Component={UserLayout}>
            <Route index path='/paskyra' element={<Account />}></Route>
          </Route>
          <Route Component={PublicLayout}>
            <Route path='*' element={<Page404 />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextWrapper>
  );
}

export default App;



