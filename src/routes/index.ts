/* eslint-disable @typescript-eslint/no-explicit-any */
import CreateCustomer from '~/pages/customer/Create';
import Dashboard from '~/pages/dashboard';
import { ReactNode } from 'react';
import Motel from '~/pages/motel';
import AddMotel from '~/pages/motel/add-motel/AddMotel';
import EditMotel from '~/pages/motel/edit-motel/EditMotel';
import AddRoom from '~/pages/room/add-room/AddRoom';

export interface Route {
    path: string;
    component: ReactNode | any;
}
const routes: Route[] = [
    { path: '', component: Dashboard },
    { path: '/customer/create', component: CreateCustomer },
    { path: '/motel-room', component: Motel },
    { path: '/motel-room/add-motel', component: AddMotel },
    { path: '/motel-room/edit-motel/:id', component: EditMotel },
    { path: '/motel-room/add-room', component: AddRoom },
];

export default routes;
