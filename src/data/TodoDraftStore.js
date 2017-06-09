import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import TodoActionTypes from './TodoActionTypes';
import TodoDispatcher from './TodoDispatcher';
import TodoDraft from '../data/TodoDraft';

class TodoDraftStore extends ReduceStore {
  constructor() {
    super(TodoDispatcher);
  }

  getInitialState() {
    return Immutable.Map({ 'draft': new TodoDraft() });
  }

  reduce(state, action) {
    switch (action.type) {
      case TodoActionTypes.ADD_TODO:
        return state.set('draft', new TodoDraft()); // clear draft contents

      case TodoActionTypes.UPDATE_DRAFT:
        if (!action.text) {
          return state;
        }
        return state.set('draft', new TodoDraft({content: action.text}));

      default:
        return state;
    }
  }
}

export default new TodoDraftStore();
