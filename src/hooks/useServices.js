import { useEffect, useReducer, useCallback } from 'react';
import get from 'lodash/get';
import apis from '../apis';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const serviceReducer = (state, { type, payload }) => {
  switch (type) {
    case 'loading': {
      return ({
        loading: true,
        error: null,
        data: state.data,
      });
    }
    case 'success': {
      return ({
        loading: false,
        error: null,
        data: payload,
      });
    }
    case 'failure': {
      return ({
        loading: false,
        error: payload,
        data: state.data,
      });
    }
    default: return state;
  }
};

/**
 * @param {String} entityAction ex. [entity].[action]
 * @returns
 */
const useServices = (entityAction, { immediate = true, params } = {}) => {
  const [serviceState, setServiceState] = useReducer(serviceReducer, initialState);

  const serviceExecuter = useCallback(async (serviceParams) => {
    setServiceState({ type: 'loading' });
    try {
      const service = get(apis, entityAction);
      const { data } = await service(serviceParams);
      setServiceState({ type: 'success', payload: data });

      return data;
    } catch (error) {
      setServiceState({ type: 'failure', payload: error });

      throw Error(error);
    }
  }, [entityAction]);

  useEffect(() => {
    if (immediate) {
      serviceExecuter(params);
    }
  }, [serviceExecuter, immediate]);

  return [serviceState, serviceExecuter];
};

export default useServices;
