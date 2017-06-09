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
              <label>{todo.text}</label>
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
