import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const url = "https://66f5fc36436827ced9759ca6.mockapi.io/todo";

export const fetchTodo = createAsyncThunk('todo/fetchTodo', async () => {
  const response = await axios.get(url);
  return response.data;
});

export const addTodo = createAsyncThunk('todo/addTodo', async (newTodo) => {
  const response = await axios.post(url, newTodo)
  return response.data
})

export const updateTodo = createAsyncThunk('todo/updateTodo', async ({ id, updateTodo }) => {
  const response = await axios.put(`${url}/${id}`, updateTodo)
  return response.data
})

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
builder
      // Handle fetchTodos
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle addTodo
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle updateTodo
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
})

export default todoSlice.reducer;