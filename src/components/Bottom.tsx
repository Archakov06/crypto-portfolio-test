import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import { Types, TCurrency } from '../reducer';

const coins: Array<{ name: string; color: string }> = [
  {
    name: 'XRP',
    color: '#FF9909',
  },
  {
    name: 'ETH',
    color: '#3C5DF8',
  },
  {
    name: 'BTC',
    color: '#010101',
  },
  {
    name: 'AOE',
    color: '#F7B82C',
  },
  {
    name: 'USD',
    color: '#325EA1',
  },
];

interface IBottomProps {
  dispatch: Function;
  addedCoins: Array<TCurrency>;
}

const Bottom = ({ dispatch, addedCoins }: IBottomProps) => {
  const [selectedCoin, setSelectedCoin] = React.useState('BTC');

  const addCoin = () => {
    const obj = coins.find(obj => obj.name === selectedCoin);
    const finded = obj && addedCoins.find(added => added.name === obj.name);
    if (obj && !finded) {
      dispatch({
        type: Types.ADD_COIN,
        payload: {
          name: obj.name,
          color: obj.color,
          value: 0,
          disabled: false,
        },
      });
    } else {
      alert('Coin added!');
    }
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCoin(event.target.value as string);
  };

  return (
    <div className="app__bottom">
      <Select onChange={handleChange} value={selectedCoin}>
        {coins.map(obj => (
          <MenuItem value={obj.name}>{obj.name}</MenuItem>
        ))}
      </Select>
      <IconButton onClick={addCoin} color="primary">
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default Bottom;
