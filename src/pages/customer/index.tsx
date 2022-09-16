import { Tabs } from 'antd';
import MemberCustomer from '~/modules/member-customer/MemberCustomer';
import ServiceCustomer from '~/modules/service-customer/ServiceCustomer';
import FormCreate from '~/modules/customer/CreateCustomer';
const { TabPane } = Tabs;

const CustomerRedirect = () => {
    return (
        <div>
            <Tabs>
                <TabPane tab='Thông tin khách thuê' key='tab-a'>
                    <FormCreate />
                </TabPane>
                <TabPane tab='Dịch vụ' key='tab-b'>
                    <ServiceCustomer />
                </TabPane>
                <TabPane tab='Thành viên' key='tab-c'>
                    <MemberCustomer />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default CustomerRedirect;
