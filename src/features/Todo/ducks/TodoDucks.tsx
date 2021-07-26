import {createSlice, createEntityAdapter, EntityState} from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export interface Todo {
  id: string
  content: string
  check: boolean
  memo: string
}

export interface TodoList {
  list: EntityState<Todo>,
}

export const todoAdapter = createEntityAdapter<Todo>({
  selectId: (item) => item.id,
})

const initialState: TodoList = {
  list: todoAdapter.getInitialState(),
}

const todoSlice = createSlice({
  name: 'todoItem',
  initialState,
  reducers: {
    add(state, {payload: {content}}) {
      const newTodo = {
        id: uuidv4(),
        content: content,
        check: false,
        memo: '',
      }
      todoAdapter.addOne(state.list, newTodo)
    },
    delete(state, {payload: {id}}) {
      todoAdapter.removeOne(state.list, id)
    },
    deleteAll(state) {
      todoAdapter.removeAll(state.list)
    },
    toggle(state, {payload: {id, check}}) {
      todoAdapter.updateOne(state.list, {
        id,
        changes: {
          check: !check,
        },
      })
    },
    memo(state, {payload: {id, memo}}) {
      todoAdapter.updateOne(state.list, {
        id,
        changes: {
          memo: memo,
        },
      })
    },
    changeContent(state, {payload: {id, content}}) {
      todoAdapter.updateOne(state.list, {
        id,
        changes: {
          content: content,
        },
      })
    },
  },
})

export const todoActions = todoSlice.actions
export const todoReducer = todoSlice.reducer
