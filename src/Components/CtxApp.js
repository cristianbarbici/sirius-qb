import React, { useReducer, useContext } from "react";

const MyContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  todos: [
    { title: "Do stuff", completed: false },
    { title: "Do something", completed: false },
    { title: "Do more stuff", completed: false },
  ],
};

const todoReducer = (state, action) => {
  console.log("todoReducer " + action.type, state.isLoggedIn);
  switch (action.type) {
    case "login":
      /* 
      state.isLoggedIn = !state.isLoggedIn;
      return state;
      */
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
      };
    case "toggleTodoCompleted":
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.title === action.payload) {
            item.completed = action.completed;
            console.log("toggling " + item.completed);
          }
          return item;
        }),
      };

    default:
      return state;
  }
};
  
export default function CtxApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todos } = state;
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      <div className="App useContext">
        <TodoPage todos={todos} dispatch={dispatch} />
      </div>
    </MyContext.Provider>
  );
}

function TodoPage({ todos, dispatch }) {
  return (
    <div className="todoContainer">
      <h2>Todos</h2>
      <button
        onClick={() => {
          dispatch({ type: "login" });
        }}
      >
        login
      </button>
      <ol>
        {todos.map((item) => (
          <TodoItem key={item.title} {...item} />
        ))}
      </ol>
    </div>
  );
}

function TodoItem({ title, completed }) {
  const { state, dispatch } = useContext(MyContext);
  const { isLoggedIn } = state;
  var subComponent = ""
  if(isLoggedIn) {
   subComponent = <input
          type="checkbox"
          checked={completed}
          onChange={() => {
            if (isLoggedIn) {
              dispatch({
                type: "toggleTodoCompleted",
                payload: title,
                completed: !completed,
              });
            }
          }}
        />
  } else {
    subComponent = <div />
  }
  return (
    <li className="todoItem">
      {title}
      {subComponent}
    </li>
  );
}
