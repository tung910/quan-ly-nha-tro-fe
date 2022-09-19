/* eslint-disable @typescript-eslint/no-explicit-any */
import Dashboard from '~/pages/dashboard';
import { ReactNode } from 'react';
import Motel from '~/pages/motel';
import AddMotel from '~/pages/motel/add-motel/AddMotel';
import EditMotel from '~/pages/motel/edit-motel/EditMotel';
import CustomerRedirect from '~/pages/customer';
import ServicePage from '~/pages/service';
import AddService from '~/pages/service/AddService';

export interface Route {
    path: string;
    component: ReactNode | any;
}
const routes: Route[] = [
    { path: '', component: Dashboard },
    { path: '/customer/create', component: CustomerRedirect },
    { path: '/motel-room', component: Motel },
    { path: '/motel-room/add-motel', component: AddMotel },
    { path: '/motel-room/edit-motel/:id', component: EditMotel },
    { path: '/service', component: ServicePage },
    { path: '/service/add-service', component: AddService },
];

export default routes;
