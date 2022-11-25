/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import MotelCustomer from '~/pages/User/motel';
import UserMotelRoom from '~/pages/User/motelroom-user';
import History from '~/pages/User/payment/History';
import UserInformation from '~/pages/User/user-infomation';
import BookingRoomDeposit from '~/pages/booking';
import AddEditBooking from '~/pages/booking/AddorEditBooking';
import Calculate from '~/pages/calculate';
import CustomerRedirect from '~/pages/customer';
import Dashboard from '~/pages/dashboard';
import PowerOnly from '~/pages/data-power';
import Motel from '~/pages/motel';
import AddMotel from '~/pages/motel/add-motel/AddMotel';
import EditMotel from '~/pages/motel/edit-motel/EditMotel';
import ListCustomer from '~/pages/motel/list-customer';
import PaymentHistory from '~/pages/payment-history';
import AddRoom from '~/pages/room/add-room/AddRoom';
import EditRoom from '~/pages/room/edit-room';
import ServicePage from '~/pages/service';
import AddEditService from '~/pages/service/AddEditService';
import TenantAccount from '~/pages/tenant-account';
import WaterPage from '~/pages/water';

export interface Route {
    path: string;
    component: ReactNode | any;
}

const routes: Route[] = [
    { path: '/', component: Dashboard },
    { path: '/customer/create', component: CustomerRedirect },
    { path: '/customer/view', component: CustomerRedirect },
    { path: '/customer/edit', component: CustomerRedirect },
    { path: '/motel-room', component: Motel },
    { path: '/motel-room/customer', component: ListCustomer },
    { path: '/motel-room/add-motel', component: AddMotel },
    { path: '/motel-room/edit-motel/:id', component: EditMotel },
    { path: '/motel-room/add-room', component: AddRoom },
    { path: '/motel-room/edit-room/:id', component: EditRoom },
    { path: '/service', component: ServicePage },
    { path: '/data-water', component: WaterPage },
    { path: '/service/add-service', component: AddEditService },
    { path: '/service/edit-service', component: AddEditService },
    { path: '/data-power', component: PowerOnly },
    { path: '/calculator-money', component: Calculate },
    { path: '/booking', component: BookingRoomDeposit },
    { path: '/booking/create', component: AddEditBooking },
    { path: '/booking/edit-booking', component: AddEditBooking },
    { path: '/tenant-account', component: TenantAccount },
    { path: '/payment-history', component: PaymentHistory },
];
export const routesUser: Route[] = [
    { path: '/user', component: UserInformation },
    { path: '/user/motel-room', component: UserMotelRoom },
    { path: '/user/motel', component: MotelCustomer },
    { path: '/user/payment-history', component: History },
];

export default routes;
