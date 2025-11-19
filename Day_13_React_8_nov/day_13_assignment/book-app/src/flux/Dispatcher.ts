import { BookAction } from './Actions';

class Dispatcher {
  private listeners: ((action: BookAction) => void)[] = [];

  register(listener: (action: BookAction) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  dispatch(action: BookAction): void {
    this.listeners.forEach(listener => listener(action));
  }
}

const dispatcher = new Dispatcher();
export default dispatcher;
