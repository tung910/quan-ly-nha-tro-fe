import 'antd/dist/antd.css';
import MainLayout from './layout/main-layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateCustomer from './pages/customer/Create';
import Dashboard from './layout/dashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Dashboard />}></Route>
                    <Route
                        path='/customer/create'
                        element={<CreateCustomer />}
                    ></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
