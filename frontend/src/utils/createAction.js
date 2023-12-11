import {createAction as createTypedAction} from 'redux-actions';

export const createAction = (actionType) => {
    return createTypedAction(actionType);
}