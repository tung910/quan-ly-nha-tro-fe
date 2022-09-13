import 'antd/dist/antd.css';
import MainLayout from './layout/main-layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateCustomer from './pages/customer/Create';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
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
