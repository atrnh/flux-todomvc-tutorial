import Immutable from 'immutable';

const Todo = Immutable.Record({
  id: '',
  complete: false,
  text: '',
  editStart: false, // maybe this is a bad idea but I'm gonna add this instead
                    // of creating a TodoEditStore
});

export default Todo;
