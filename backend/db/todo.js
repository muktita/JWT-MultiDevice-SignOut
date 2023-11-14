
const { Schema , model} = require('mongoose');


const TodoSchema = new Schema({
    id: { type: Schema.ObjectId}, 
    userid: { type: Schema.ObjectId}, 
    todo: { type: String, require: true },
});
  
const Todo = model('Todo', TodoSchema);


const createTodo = async(todo, userid) => {

    try{
        const newTodo = new Todo({ 
            userid: userid ,
            todo : todo
        });
    
        await newTodo.save();
            
        return {
            id : newTodo._id,
            todo: newTodo.todo ,
        }

    } catch(err){
        return null
    }
}

const getAllTodos = async(userid) => {

    try{
        const todos = await Todo.find({ userid: userid })
        result = todos.map( item=> { 
            return {
                id : item._id,
                todo: item.todo 
            } 
        });
        return  result

    } catch(err){
        return null
    }
}

const getSingleTodo = async(todoId , userid) => {

    try{
        const todo = await Todo.findById(todoId)
        if (todo && todo.userid == userid) {
            return {
                id : todo._id,
                todo: todo.todo 
            } 
        }
        return null

    } catch(err){
        return null
    }
}

const updateTodo = async(todoId , new_todo_text, userid) => {

    try{
        const todoVal = await Todo.findById(todoId)
        if (todoVal && todoVal.userid == userid) {
            todoVal.todo = new_todo_text
            await todoVal.save();
            return {
                id : todoVal._id,
                todo: todoVal.todo 
            } 
        }
        return null

    } catch(err){
        return null
    }
}

const deleteTodo = async(todoId , userid) => {

    try{
        const todoVal = await Todo.findById(todoId)
        if (todoVal && todoVal.userid == userid) {
            await todoVal.deleteOne();
            return { status : "deteled" }
        } else{
            return null
        }
        

    } catch(err){
        return null
    }
}



module.exports = {createTodo , getAllTodos , getSingleTodo , updateTodo , deleteTodo}
