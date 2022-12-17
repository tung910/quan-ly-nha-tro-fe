import { Tabs as TabsAntd } from 'antd';
import { TypeTabs } from '~/types/Setting.type';

interface Props {
    items: TypeTabs[];
    activeKey: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
}

const Tabs = (props: Props) => {
    const { items, activeKey, onChange, ...pasProps } = props;

    return (
        <TabsAntd
            activeKey={activeKey}
            onChange={onChange}
            items={items}
            {...pasProps}
        />
    );
};

export default Tabs;
