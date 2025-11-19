import bookStore from './BookStore';
import dispatcher from './Dispatcher';

export interface IBookStore {
  getBooks(): any[];
  addChangeListener(listener: () => void): () => void;
}

export interface IDispatcher {
  register(listener: (action: any) => void): () => void;
  dispatch(action: any): void;
}

export class BookStoreDI implements IBookStore {
  getBooks(): any[] {
    return bookStore.getBooks();
  }

  addChangeListener(listener: () => void): () => void {
    return bookStore.addChangeListener(listener);
  }
}

export class DispatcherDI implements IDispatcher {
  register(listener: (action: any) => void): () => void {
    return dispatcher.register(listener);
  }

  dispatch(action: any): void {
    dispatcher.dispatch(action);
  }
}
