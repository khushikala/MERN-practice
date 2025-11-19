import { Book, BookAction } from './Actions';
import { ADD_BOOK } from './ActionTypes';
import dispatcher from './Dispatcher';

class BookStore {
  private books: Book[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    dispatcher.register(this.handleAction.bind(this));
  }

  getBooks(): Book[] {
    return this.books;
  }

  addChangeListener(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private handleAction(action: BookAction): void {
    switch (action.type) {
      case ADD_BOOK:
        this.books.push(action.payload);
        this.emitChange();
        break;
      default:
        break;
    }
  }

  private emitChange(): void {
    this.listeners.forEach(listener => listener());
  }
}

const bookStore = new BookStore();
export default bookStore;
