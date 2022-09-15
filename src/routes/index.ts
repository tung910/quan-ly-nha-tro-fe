/* eslint-disable @typescript-eslint/no-explicit-any */
import CreateCustomer from '~/pages/customer/Create';
import Dashboard from '~/pages/dashboard';
import { ReactNode } from 'react';
import Motel from '~/pages/motel';

export interface Route {
    path: string;
    component: ReactNode | any;
}
const routes: Route[] = [
    { path: '', component: Dashboard },
    { path: '/customer/create', component: CreateCustomer },
    { path: '/motel-room', component: Motel },
];

export default routes;
