class EventObservable {
  constructor() {
    this.observers = [];
  }

  addObserver(o) {
    this.observers.push(o);
  }

  removeObserver(o) {
    this.observers = this.observers.filter((subscriber) => subscriber !== o);
  }

  notifyObservers(eventType, message) {
    this.observers.forEach((elem) => {
      if (elem && ('handleEvent' in elem)) {
        elem.handleEvent(message, eventType);
      }
    });
  }
}
export default EventObservable;
