import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addTodo, removeTodo, loadTodos } from '../state/todos/todo.actions';
import { selectAllTodos } from '../state/todos/todo.selectors';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: 'todo.page.html',
  styleUrls: ['todo.page.scss'],
})
export class TodoPage implements OnInit {
  public allTodos$ = this.store.select(selectAllTodos);
  public todo = '';
  public todosLength: number = 0;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadTodos());
    this.updateTodosLength();
  }

  addTodo() {
    this.store.dispatch(addTodo({ content: this.todo }));
    this.updateTodosLength();
    this.todo = '';
  }

  removeTodo(todo: Todo) {
    this.store.dispatch(removeTodo({ id: todo.id }));
    this.updateTodosLength();
  }

  updateTodosLength() {
    this.store
      .select(selectAllTodos)
      .subscribe((todos) => (this.todosLength = todos.length));
  }
}