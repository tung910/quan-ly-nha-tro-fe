import { Tabs } from 'antd';
import ServiceCustomer from '~/modules/service-customer/ServiceCustomer';
import FormCreate from '~/modules/tenant-infor/FormCreate';
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
            </Tabs>
        </div>
    );
};

export default CustomerRedirect;
