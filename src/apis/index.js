import { ApiGroup } from 'axios-actions';
import mainAxiosInstance from '../libraries/axios/instance';
import actions from '../libraries/axios/actions';

const actionsReducer = (accumulator, [entity, entityAction]) => ({
  ...accumulator,
  [entity]: new ApiGroup(mainAxiosInstance, entityAction),
});

const apis = Object.entries(actions).reduce(actionsReducer, {});

export default apis;
