import { ConfigProvider } from 'antd';
import viVn from 'antd/lib/locale-provider/vi_VN';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '~/app/store';

import App from './App';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <ConfigProvider locale={viVn}>
            <App />
        </ConfigProvider>
    </Provider>
);
