import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { PriorityQueue } from './priority-queue.js';

test('adds items to the queue and maintains order', () => {
  const queue = new PriorityQueue();
  queue.add(3).add(1).add(2);
  assert.deepEqual([...queue], [3, 2, 1]);
});

test('adds items to the queue with a custom comparator', () => {
  const queue = new PriorityQueue((a, b) => b - a);
  queue.add(3).add(1).add(2);
  assert.deepEqual([...queue], [1, 2, 3]);
});

test('checks if an item is in the queue', () => {
  const queue = new PriorityQueue();
  queue.add(3).add(1).add(2);
  assert.equal(queue.has(3), true);
  assert.equal(queue.has(4), false);
});

test('removes the highest priority item', () => {
  const queue = new PriorityQueue();
  queue.add(3).add(1).add(2);
  assert.equal(queue.removeHighest(), 3);
  assert.equal(queue.removeHighest(), 2);
  assert.equal(queue.removeHighest(), 1);
  assert.equal(queue.removeHighest(), undefined);
});

test('removes the lowest priority item', () => {
  const queue = new PriorityQueue();
  queue.add(3).add(1).add(2);
  assert.equal(queue.removeLowest(), 1);
  assert.equal(queue.removeLowest(), 2);
  assert.equal(queue.removeLowest(), 3);
  assert.equal(queue.removeLowest(), undefined);
});
