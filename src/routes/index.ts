/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, lazy } from 'react';

const DashboardLazy = lazy(() => import('~/pages/dashboard'));
const CustomerRedirectLazy = lazy(() => import('~/pages/customer'));
const MotelLazy = lazy(() => import('~/pages/motel'));
const ListCustomerLazy = lazy(() => import('~/pages/motel/list-customer'));
const AddMotelLazy = lazy(() => import('~/pages/motel/add-motel/AddMotel'));
const EditMotelLazy = lazy(() => import('~/pages/motel/edit-motel/EditMotel'));
const AddRoomLazy = lazy(() => import('~/pages/room/add-room/AddRoom'));
const EditRoomLazy = lazy(() => import('~/pages/room/edit-room'));
const ServicePageLazy = lazy(() => import('~/pages/service'));
const WaterPageLazy = lazy(() => import('~/pages/water'));
const AddEditServiceLazy = lazy(() => import('~/pages/service/AddEditService'));
const PowerOnlyLazy = lazy(() => import('~/pages/data-power'));
const CalculateLazy = lazy(() => import('~/pages/calculate'));
const BookingRoomDepositLazy = lazy(() => import('~/pages/booking'));
const AddEditBookingLazy = lazy(
    () => import('~/pages/booking/AddorEditBooking')
);
const TenantAccountLazy = lazy(() => import('~/pages/tenant-account'));
const PaymentHistoryLazy = lazy(() => import('~/pages/payment-history'));
const ProfileLazy = lazy(() => import('~/pages/User/user-infomation/Profile'));
const UserMotelRoomLazy = lazy(() => import('~/pages/User/motelroom-user'));
const MotelCustomerLazy = lazy(() => import('~/pages/User/motel'));
const HistoryLazy = lazy(() => import('~/pages/User/payment/History'));
export interface Route {
    path: string;
    component: ReactNode | any;
}

const routes: Route[] = [
    { path: '/', component: DashboardLazy },
    { path: '/customer/create', component: CustomerRedirectLazy },
    { path: '/customer/view', component: CustomerRedirectLazy },
    { path: '/customer/edit', component: CustomerRedirectLazy },
    { path: '/motel-room', component: MotelLazy },
    { path: '/motel-room/customer', component: ListCustomerLazy },
    { path: '/motel-room/add-motel', component: AddMotelLazy },
    { path: '/motel-room/edit-motel/:id', component: EditMotelLazy },
    { path: '/motel-room/add-room', component: AddRoomLazy },
    { path: '/motel-room/edit-room/:id', component: EditRoomLazy },
    { path: '/service', component: ServicePageLazy },
    { path: '/data-water', component: WaterPageLazy },
    { path: '/service/add-service', component: AddEditServiceLazy },
    { path: '/service/edit-service', component: AddEditServiceLazy },
    { path: '/data-power', component: PowerOnlyLazy },
    { path: '/calculator-money', component: CalculateLazy },
    { path: '/booking', component: BookingRoomDepositLazy },
    { path: '/booking/create', component: AddEditBookingLazy },
    { path: '/booking/edit-booking', component: AddEditBookingLazy },
    { path: '/tenant-account', component: TenantAccountLazy },
    { path: '/payment-history', component: PaymentHistoryLazy },
    { path: '/profile', component: ProfileLazy },
];
export const routesUser: Route[] = [
    { path: '/user/motel-room', component: UserMotelRoomLazy },
    { path: '/user/motel', component: MotelCustomerLazy },
    { path: '/user/payment-history', component: HistoryLazy },
    { path: '/user/profile', component: ProfileLazy },
];

export default routes;
