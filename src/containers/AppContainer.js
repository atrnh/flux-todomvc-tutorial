import AppView from '../views/AppView';
import {Container} from 'flux/utils';
import TodoStore from '../data/TodoStore';
import TodoActions from '../data/TodoActions';
import TodoDraftStore from '../data/TodoDraftStore';

function getStores() {
  return [
    TodoStore,
    TodoDraftStore,
  ];
}

function getState() {
  return {
    todos: TodoStore.getState(),
    todoDraft: TodoDraftStore.getState(),

    onDeleteTodo: TodoActions.deleteTodo,
    onToggleTodo: TodoActions.toggleTodo,
    onUpdateTodoDraft: TodoActions.updateDraft,
    onAddTodo: TodoActions.addTodo,
    onDeleteCompleted: TodoActions.deleteCompletedTodos,
  };
}

export default Container.createFunctional(AppView, getStores, getState);
