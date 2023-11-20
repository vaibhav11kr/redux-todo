import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  removeTodos,
  updateTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id)),
  };
};

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active");
  const getButtonStyle = (buttonSort) => {
    return {
      scale: sort === buttonSort ? 1 : 0.9,
      border: sort === buttonSort ? "2px solid #007BFF" : "2px solid #ccc",
    };
  };
  return (
    <div className="displaytodos">
      <div className="buttons">
        <motion.button
          style={getButtonStyle("active")}
          whileTap={{ scale: 0.8 }}
          onClick={() => setSort("active")}
        >
          Todo
        </motion.button>
        <motion.button
          style={getButtonStyle("completed")}
          whileTap={{ scale: 0.8 }}
          onClick={() => setSort("completed")}
        >
          Done
        </motion.button>
        <motion.button
          style={getButtonStyle("all")}
          whileTap={{ scale: 0.8 }}
          onClick={() => setSort("all")}
        >
          All
        </motion.button>
      </div>
      <div className="todoList">
        <ul>
          <AnimatePresence>
            {props.todos.length > 0 && sort === "active"
              ? props.todos.map((item) => {
                  return (
                    item.completed === false && (
                      <TodoItem
                        key={item.id}
                        item={item}
                        removeTodo={props.removeTodo}
                        updateTodo={props.updateTodo}
                        completeTodo={props.completeTodo}
                      />
                    )
                  );
                })
              : null}
            {/* for completed items */}
            {props.todos.length > 0 && sort === "completed"
              ? props.todos.map((item) => {
                  return (
                    item.completed === true && (
                      <TodoItem
                        key={item.id}
                        item={item}
                        removeTodo={props.removeTodo}
                        updateTodo={props.updateTodo}
                        completeTodo={props.completeTodo}
                      />
                    )
                  );
                })
              : null}
            {/* for all items */}
            {props.todos.length > 0 && sort === "all"
              ? props.todos.map((item) => {
                  return (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      completeTodo={props.completeTodo}
                    />
                  );
                })
              : null}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
