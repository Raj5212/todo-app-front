import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Paper, Switch, FormControlLabel, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { motion } from 'framer-motion';
import { addTodo, fetchTodos, updateTodo, deleteTodo } from '../../redux/Todo/todo-action';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskForm = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  
  const [formData, setFormData] = useState({ title: '', content: '', completed: false });
  const [errors, setErrors] = useState({});
  const [editTask, setEditTask] = useState(null);  
  const [deleteTaskId, setDeleteTaskId] = useState(null); 

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.title.trim()) tempErrors.title = 'Title is required';
    if (!formData.content.trim()) tempErrors.content = 'Content is required';
    return tempErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggle = () => {
    setFormData({ ...formData, completed: !formData.completed });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      if (editTask) {
        dispatch(updateTodo(editTask._id, formData)); // Edit task
      } else {
        dispatch(addTodo(formData)); // Add task
      }
      resetForm();
    } else {
      setErrors(validationErrors);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', completed: false });
    setEditTask(null);
  };

  const handleEdit = (task) => {

    setEditTask(task);
    setFormData({ title: task.title, content: task.content, completed: task.completed });
  };

  const handleDelete = (id) => {
    setDeleteTaskId(id);  // Show delete modal
  };

  const confirmDelete = () => {
    dispatch(deleteTodo(deleteTaskId));
    setDeleteTaskId(null);  // Close modal after delete
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            padding: '20px',
            marginTop: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f5f5f5',
          }}
          elevation={3}
        >
          <Typography variant="h5" align="center" gutterBottom>
            {editTask ? 'Edit Task' : 'Add New Task'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Task Title"
              name="title"
              fullWidth
              value={formData.title}
              onChange={handleInputChange}
              sx={{ marginBottom: '15px' }}
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              label="Task Content"
              name="content"
              fullWidth
              multiline
              minRows={4}
              value={formData.content}
              onChange={handleInputChange}
              sx={{ marginBottom: '15px' }}
              error={!!errors.content}
              helperText={errors.content}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.completed}
                  onChange={handleToggle}
                  color="primary"
                />
              }
              label="Mark as Completed"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: '20px' }}
            >
              {editTask ? 'Update Task' : 'Add Task'}
            </Button>
          </form>
        </Paper>

        {/* Task List */}
        <Typography variant="h6" align="center" gutterBottom sx={{ marginTop: '30px' }}>
          Task List
        </Typography>
        <List>
          {todos?.map((task) => (
            <ListItem key={task?.id}>
              <ListItemText
                primary={task?.title}
                secondary={task?.content}
                sx={{
                  textDecoration: task?.completed ? 'line-through' : 'none',
                }}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleEdit(task)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(task._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        {/* Delete Confirmation Modal */}
        <Dialog
          open={!!deleteTaskId}
          onClose={() => setDeleteTaskId(null)}
        >
          <DialogTitle>Delete Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this task?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteTaskId(null)} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </motion.div>
  );
};

export default TaskForm;
