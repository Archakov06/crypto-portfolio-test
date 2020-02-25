import React from 'react';

import reducer, { initState, Types } from './reducer';
import Coin from './components/Coin';
import Bottom from './components/Bottom';

function App() {
  const [state, dispatch] = React.useReducer(reducer, initState);

  const handleChange = (name: string, newValue: number | number[]) => {
    const obj = state.values.find(obj => obj.name === name);
    const disabled = obj?.disabled || false;
    if (!disabled) {
      dispatch({
        type: Types.SET_RANGE_VALUE,
        payload: {
          name: name,
          value: Number(newValue),
        },
      });
    }
  };

  const toggleLock = (name: string) => {
    dispatch({
      type: Types.TOGGLE_LOCK_COIN,
      payload: name,
    });
  };

  const removeCoin = (name: string) => {
    if (window.confirm('Remove coin?')) {
      dispatch({
        type: Types.REMOVE_COIN,
        payload: name,
      });
    }
  };

  return (
    <div className="app">
      <h1>Portfolio constructor</h1>
      <div className="app__top">
        {state.values.map(obj => (
          <div
            key={obj.name}
            style={{
              backgroundColor: obj.color,
              width: (obj.value ? (obj.value * state.total) / 100 : 0) + '%',
            }}
            className="progress"></div>
        ))}
      </div>
      {state.values.map(obj => (
        <Coin
          key={obj.name}
          max={state.max}
          total={state.total}
          onToggleLock={toggleLock}
          onChangeSlider={handleChange}
          onRemove={removeCoin}
          {...obj}
        />
      ))}
      <Bottom dispatch={dispatch} addedCoins={state.values} />
    </div>
  );
}

export default App;
