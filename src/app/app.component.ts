import {Component, OnInit} from '@angular/core';
import {element} from 'protractor';
import index from '@angular/cli/lib/cli';
import Task from './interfaces/tasks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string;
  idForTask = 3;

  static setLocalStorage(item: Task[]): void {
    localStorage.setItem('userTasks', JSON.stringify(item));
  }

  addTask(newTask: string): void {
    if (newTask) {
      this.tasks.push({
        id: this.idForTask,
        title: newTask,
        completed: false,
        editing: false
      });
      this.newTaskTitle = '';
      this.idForTask++;
    }
    AppComponent.setLocalStorage(this.tasks);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    AppComponent.setLocalStorage(this.tasks);
  }

  doneTask(task: Task, e): void {
    task.completed = !task.completed;
    e.target.parentElement.classList.toggle('done');
    AppComponent.setLocalStorage(this.tasks);
  }

  removeCompletedTasks(): void {
    this.tasks = this.tasks.filter(task => task.completed === false);
    AppComponent.setLocalStorage(this.tasks);

  }

  ngOnInit() {
  this.newTaskTitle = '';
  this.tasks = !localStorage.userTasks ? [
      {
        id: 1,
        title: 'Run the world',
        completed: false,
        editing: false
    },
    {
      id: 2,
      title: 'Tidy the room',
      completed: false,
      editing: false
    }
  ] : JSON.parse(localStorage.getItem('userTasks'));
  AppComponent.setLocalStorage(this.tasks);
  }
}


