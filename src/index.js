import './index.html';
import './index.css';
import dva from 'dva';
import { message } from 'antd';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';

// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false }),
  onError(e) {
    console.log(e);
    message.error(e.message);
  }
});

// 2. Plugins
//app.use({});

// 3. Model
app.model(require('./models/Login'));
app.model(require('./models/SideNav'));
app.model(require('./models/MainTabs'));
app.model(require('./models/BasicModal'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
