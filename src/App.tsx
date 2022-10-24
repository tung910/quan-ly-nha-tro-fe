import { Spin } from 'antd';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { appSelector } from './feature/service/appSlice';
import SignIn from './feature/user/signIn';
import SignUpPage from './feature/user/signUp';
import MainLayout from './layout/main-layout';
import routes, { routesUser } from './routes';

function App() {
    const state = useAppSelector((state) => appSelector(state));
    const user = useAppSelector((state: any) => {
        return state.user.user;
    });
    return (
        <Spin spinning={state.isLoading}>
            <BrowserRouter>
                <Routes>
                    <Route path='/'>
                        <Route path='/sign-up' element={<SignUpPage />} />
                        <Route path='/login' element={<SignIn />} />
                        <Route
                            path='/'
                            element={
                                +user.role === 1 ? (
                                    <MainLayout />
                                ) : (
                                    <Navigate to='/login' />
                                )
                            }
                        >
                            {routes.map((item, index) => {
                                let Comp;
                                if (item.component) {
                                    Comp = item.component;
                                }

                                return (
                                    <Route
                                        key={index}
                                        path={item.path}
                                        element={<Comp />}
                                    ></Route>
                                );
                            })}
                        </Route>
                        <Route
                            path='/user'
                            element={
                                +user.role === 0 ? (
                                    <MainLayout />
                                ) : (
                                    <Navigate to='/login' />
                                )
                            }
                        >
                            {routesUser.map((item, index) => {
                                let Comp;
                                if (item.component) {
                                    Comp = item.component;
                                }

                                return (
                                    <Route
                                        key={index}
                                        path={item.path}
                                        element={<Comp />}
                                    ></Route>
                                );
                            })}
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Spin>
    );
}
export default App;
