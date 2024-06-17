import { Tabs } from 'antd';
import './app.css';
import { Counter as MobxCounter } from './counter/counter-mobx';
import { Counter as ReduxCounter } from './counter/counter-redux';
import { Counter as RxjsCounter } from './counter/counter-rxjs';

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
  ];

  return (
    <div className="main">
      <Tabs destroyInactiveTabPane items={tabs}></Tabs>
    </div>
  );
}

export default App;
