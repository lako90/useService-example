import { ApiGroup } from 'axios-actions';
import get from 'lodash/get';
import { authAxiosInstance, mainAxiosInstance } from '../axios/instance';
import actions from '../axios/actions';
import { isAuthEntity, isNotAuthEntity } from './utils';

/**
 * Return a ApiGroup for related entity
 */
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

const getApi = (entityAction) => entityAction && get(apis, entityAction);

export { apis, getApi };
