import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with the items returned from the server', () => {
    spyOn(service, 'getTodos').and.callFake(() => {
      return Observable.from([
        [{ id: 1, title: 'a' }, { id: 2, title: 'b' }, { id: 3, title: 'c' }]
      ]);

      component.ngOnInit();

      expect(component.todos.length).toBe(3);
    });
  });

  it('should call the server to save the changes when a new todo item is added', () => {
    let spy = spyOn(service, 'add').and.callFake(todo => {
      return Observable.empty();
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo iten returned from the server', () => {
    let todo = { id: 1, title: 'new todo title' };
    let spy = spyOn(service, 'add').and.returnValue(Observable.from([todo]));

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the message property of server return an error when adding a new todo', () => {
    let err = 'Some error';
    let spy = spyOn(service, 'add').and.returnValue(Observable.throw(err));

    component.add();

    expect(component.message).toBe(err);
  });
});
