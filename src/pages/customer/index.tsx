import { Tabs } from 'antd';
import ServiceCustomer from '~/modules/service-customer/ServiceCustomer';
import FormCreate from '~/modules/customer/CreateCustomer';
const { TabPane } = Tabs;

const Customer = () => {
    return (
        <div>
            <Tabs>
                <TabPane tab='Thông tin khách thuê' key='tab-a'>
                    <FormCreate />
                </TabPane>
                <TabPane tab='Dịch vụ' key='tab-b'>
                    <ServiceCustomer />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Customer;
