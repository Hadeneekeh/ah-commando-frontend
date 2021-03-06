import * as types from '@Actions/types';

const initialState = {
  user: null,
  article: null,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE_START:
      return {
        ...state,
      };
    case types.GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case types.GET_PROFILE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case types.EDIT_PROFILE_START:
      return {
        ...state,
      };
    case types.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case types.EDIT_PROFILE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case types.GET_ARTICLE_START:
      return {
        ...state,
      };
    case types.GET_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload,
      };
    case types.GET_ARTICLE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default profileReducer;
