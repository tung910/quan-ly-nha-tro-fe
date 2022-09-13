import './App.scss';
import 'antd/dist/antd.css';
import Dashboard from './layout/dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateCustomer from './layout/customer/create';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />}></Route>
                <Route
                    path='/customer/create'
                    element={<CreateCustomer />}
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
