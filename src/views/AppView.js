import React from 'react';

function AppView(props) {
  return (
    <div>
      <Header {...props} />
      <NewTodo {...props} />
      <Main {...props} />
      <Footer {...props} />
    </div>
  );
}

function Header(props) {
  return (
    <header id="header">
      <h1>todos</h1>
    </header>
  );
}

function Todo(props) {
  if (props.todos.size === 0) {
    return null;
  }

  const editField = (
    <form onSubmit={
      e => {
        e.preventDefault();
        props.onStopEditingTodo(props.todo.id);
      }
    }>
      <label>
        <input
          className="edit-todo"
          type="text"
          onChange={(e) => props.onUpdateTodo(props.todo.id, e.target.value)}
          value={props.todo.text}
        />
      </label>
      <input type="submit" value="update" />
    </form>
  );

  return (
    <label onDoubleClick={() => props.onStartEditingTodo(props.todo.id)}>
      {props.todo.editStart ? editField : props.todo.text}
    </label>
  );
}

function Main(props) {
  if (props.todos.size === 0) {
    return null;
  }
  return (
    <section id="main">
      <ul id="todo-list">
        {[...props.todos.values()].reverse().map(todo => (
          <li key={todo.id}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={todo.complete}
                onChange={() => props.onToggleTodo(todo.id)}
              />
              <Todo {...props} todo={todo} />
              <button
                className="destroy"
                onClick={() => props.onDeleteTodo(todo.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Footer(props) {
  if (props.todos.size === 0) {
    return null;
  }

  const remaining = props.todos.filter(todo => !todo.complete).size;
  const phrase = remaining === 1 ? ' item left' : ' items left';

  return (
    <footer id="footer">
      <span id="todo-count">
        <strong>
          {remaining}
        </strong>
        {phrase}
      </span>
      <button onClick={() => {props.onDeleteCompleted()}}>
        clear completed
      </button>
      <button onClick={() => {props.onToggleAllTodos()}}>
        toggle all
      </button>
    </footer>
  );
}

function NewTodo(props) {
  return (
    <form onSubmit={
      e => {
        e.preventDefault();
        props.onAddTodo(props.todoDraft.get('draft').content);
      }
    }>
      <label>
        new todo:
        <input
          className="new-todo"
          type="text"
          onChange={(e) => {props.onUpdateTodoDraft(e.target.value)}}
          value={props.todoDraft.get('draft').content}
        />
      </label>
      <input type="submit" value="add todo" />
    </form>
  );
}

export default AppView;
