export enum Types {
  SET_RANGE_VALUE,
  TOGGLE_LOCK_COIN,
  REMOVE_COIN,
  ADD_COIN,
}

type TSetRangeValueAction = {
  type: Types.SET_RANGE_VALUE;
  payload: {
    name: string;
    value: number;
  };
};

type TToggleLockCoint = {
  type: Types.TOGGLE_LOCK_COIN;
  payload: string;
};

type TAddCoin = {
  type: Types.ADD_COIN;
  payload: TCurrency;
};

type TRemoveCoin = {
  type: Types.REMOVE_COIN;
  payload: string;
};

type Action = TSetRangeValueAction | TToggleLockCoint | TRemoveCoin | TAddCoin;

interface IState {
  max: number;
  total: number;
  values: Array<TCurrency>;
}

export type TCurrency = {
  name: string;
  value: number;
  color: string;
  disabled: boolean;
};

export const initState = {
  max: 100,
  total: 0,
  values: [],
};

export default (state: IState, action: Action) => {
  switch (action.type) {
    case Types.SET_RANGE_VALUE:
      return {
        ...state,
        total: state.values.reduce((sum, obj) => {
          return sum + obj.value;
        }, 0),
        values: state.values.map(obj => {
          if (state.total >= state.max && action.payload.value > obj.value) {
            return obj;
          }
          if (obj.name === action.payload.name) {
            obj.value = action.payload.value;
          }
          return obj;
        }),
      };

    case Types.TOGGLE_LOCK_COIN:
      return {
        ...state,
        values: state.values.map(obj => {
          if (obj.name === action.payload) {
            obj.disabled = !obj.disabled;
          }
          return obj;
        }),
      };

    case Types.REMOVE_COIN:
      return {
        ...state,
        values: state.values.filter(obj => obj.name !== action.payload),
      };

    case Types.ADD_COIN:
      return {
        ...state,
        values: [...state.values, action.payload],
      };

    default:
      return state;
  }
};
