const ADD_BOOK = 'ADD_BOOK';

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  bio: string;
  topBooks: string[];
}

export interface AddBookAction {
  type: typeof ADD_BOOK;
  payload: Book;
}

export type BookAction = AddBookAction;

export const addBook = (book: Book): AddBookAction => ({
  type: ADD_BOOK,
  payload: book,
});
