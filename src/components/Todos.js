import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import { addTodos, clearTodos } from "../redux/reducer";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    clearTodos: () => dispatch(clearTodos()), 
  };
};

const Todos = (props) => {
  const [todo, setTodo] = useState("");
  
  useEffect(() => {
    const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (initialTodos.length > 0) {
      props.clearTodos();
      initialTodos.forEach((todo) => {
        props.addTodo(todo);
      });
    }
  }, []);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const add = () => {
    if (todo === "") {
      alert("Oops! Empty entry 🫤");
    } else {
      const newTodo = {
        id: Math.floor(Math.random() * 1000),
        item: todo,
        completed: false,
      };
      props.addTodo(newTodo);
      setTodo("");
      
      const updatedTodos = [...props.todos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };
  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="todo-input"
        value={todo}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        onClick={() => add()}
      >
        <GoPlus />
      </motion.button>
      <br />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
