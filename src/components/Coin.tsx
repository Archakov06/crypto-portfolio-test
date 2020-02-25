import React from 'react';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { TCurrency } from '../reducer';

type TCoinProps = {
  max: number;
  total: number;
  onChangeSlider: (name: string, newValue: number | number[]) => void;
  onToggleLock: (name: string) => void;
  onRemove: (name: string) => void;
};

const Coin = ({
  color,
  name,
  value,
  total,
  max,
  disabled,
  onChangeSlider,
  onToggleLock,
  onRemove,
}: TCurrency & TCoinProps) => {
  return (
    <div className="coin">
      <div className="coin__top">
        <div className="coin__name">
          <div style={{ backgroundColor: color }} className="coin__color"></div>
          <b>{name}</b>
        </div>
        <div className="coin__percentage">
          <span>{value ? ((value * total) / 100).toFixed(2) : 0} %</span>
          <IconButton onClick={() => onToggleLock(name)} aria-label="delete">
            {!disabled ? <LockOpenIcon fontSize="small" /> : <LockIcon fontSize="small" />}
          </IconButton>
        </div>
        <div className="coin__remove">
          <IconButton onClick={() => onRemove(name)} aria-label="delete">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <Slider
        key={name}
        onChange={(e: any, newValue: number | number[]) => {
          onChangeSlider(name, newValue);
        }}
        value={value}
        min={1}
        max={max}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default Coin;
