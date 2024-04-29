/**
 * A data structure that stores items in a priority order.
 */
export class PriorityQueue {
  static #defaultComparator = (a, b) => a - b;

  // Determines the order of items in the queue.
  #comparator;

  // Stored as a binary search tree, where index 0 is the highest priority.
  #items = [];

  /**
   * Creates a new priority queue.
   * 
   * Optionally, provide a comparator, otherwise `(a, b) => a - b` will be used.
   */
  constructor(comparator) {
    this.#comparator = comparator || PriorityQueue.#defaultComparator;
  }

  /**
   * Adds an item to the queue.
   * 
   * Returns the queue itself, for chaining.
   */
  add(item) {
    const index = this.#indexOf(item);
    this.#items.splice(index, 0, item);
    return this;
  }

  /**
   * Returns `true` if the item is in the queue.
   */
  has(item) {
    return this.#items[this.#indexOf(item)] === item;
  }

  #indexOf(item) {
    let low = 0;
    let high = this.#items.length;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (this.#comparator(item, this.#items[mid]) < 0) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    return low;
  }

  /**
   * Removes and returns the item with the highest priority.
   *
   * If the queue is empty, returns `undefined`.
   */
  removeHighest() {
    return this.#items.shift();
  }

  /**
   * Removes and returns the item with the lowest priority.
   * 
   * If the queue is empty, returns `undefined`.
   */
  removeLowest() {
    return this.#items.pop();
  }

  // Make this class an iterable.
  [Symbol.iterator]() {
    return this.#items[Symbol.iterator]();
  }

  /**
   * Returns the number of items in the queue.
   */
  get size() {
    return this.#items.length;
  }
}
