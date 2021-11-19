import { ApiGroup } from 'axios-actions';
import { authAxiosInstance, mainAxiosInstance } from '../libraries/axios/instance';
import actions from '../libraries/axios/actions';
import { isAuthEntity, isNotAuthEntity } from './utils';

const getActionsReducer = (axiosInstance) => (accumulator, [entity, entityAction]) => ({
  ...accumulator,
  [entity]: new ApiGroup(axiosInstance, entityAction),
});

const authApis = Object
  .entries(actions)
  .filter(isAuthEntity)
  .reduce(getActionsReducer(authAxiosInstance), {});

const mainApis = Object
  .entries(actions)
  .filter(isNotAuthEntity)
  .reduce(getActionsReducer(mainAxiosInstance), {});

const apis = { ...authApis, ...mainApis };

export default apis;
