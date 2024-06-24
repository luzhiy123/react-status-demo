import { Tabs } from 'antd';
import Amount from './amount-box';
import './app.css';
import MobxCounter from './counter/counter-mobx';
import ReduxCounter from './counter/counter-redux';
import RxjsCounter from './counter/counter-rxjs';

function App() {
  const tabs = [
    {
      label: 'redux',
      key: 'redux',
      children: <ReduxCounter></ReduxCounter>,
    },
    {
      label: 'mobx',
      key: 'mobx',
      children: <MobxCounter></MobxCounter>,
    },
    {
      label: 'rxjs',
      key: 'rxjs',
      children: <RxjsCounter></RxjsCounter>,
    },
    {
      label: 'amount',
      key: 'amount',
      children: <Amount></Amount>,
    },
  ];

  return (
    <div className="main">
      <Tabs destroyInactiveTabPane items={tabs}></Tabs>
    </div>
  );
}

export default App;
