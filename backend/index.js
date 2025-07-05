import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

// database schema
const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true}
});

const Todo = mongoose.model("todo", todoSchema);

const connectsDB = () => {
    mongoose.connect('mongodb://localhost:27017/Test').then(() => {
        console.log("database is connected");
    }).catch((err) => {
        console.log(`something went wrong ${err}`);
    })
}


// api for geeting all the todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos)
    } catch(err) {
        console.log('something went wrong', err);
        res.status(500).json({
            success: false,
            msg: "internal server error"
        })
    }
});

app.post('/todos', async (req, res) => {
    const { title, description } = req.body;
    if(!title || !description) {
        res.status(400).json({
            success: false,
            msg: "both are required"
        })
    }
    
   await Todo.insertOne({
    title: title,   
    description: description
   })

    res.json({
        success: true,
        msg: "Todo created successfully"
    });
});


app.delete('/todos/:id', async (req, res) => {
    try {
        const todoId = req.params.id;
        const deleteTodo = await Todo.findByIdAndDelete(todoId);

        if(!deleteTodo) {
            res.status(400).json({
                msg: "todo not found"
            })
        }

        res.status(200).json({
            msg: "todo delete successfully",
            deleteTodo
        });
    } catch(err) {
        console.log("error aa gyi", err);
        res.status(500).json({
            msg: "internal server error"
        })
    }
});



connectsDB();
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});