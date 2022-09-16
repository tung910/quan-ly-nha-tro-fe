import { Tabs } from 'antd';
import ContractCustomer from '~/modules/contract-customer/ContractCustomer';
import MemberCustomer from '~/modules/member-customer/MemberCustomer';
import ServiceCustomer from '~/modules/service-customer/ServiceCustomer';
import FormCreate from '~/modules/tenant-infor/CreateCustomer';
const { TabPane } = Tabs;

const TabsCreate = () => {
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
                <TabPane tab='Hợp đồng' key='tab-d'>
                    <ContractCustomer />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default TabsCreate;
