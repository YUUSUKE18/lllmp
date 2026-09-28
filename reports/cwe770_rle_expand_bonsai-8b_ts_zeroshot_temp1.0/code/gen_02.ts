import { Readable } from 'stream';

interface Element {
  value: number;
  count: number;
}

const input = process.stdin.read();
const elements = input
  .split(',')
  .map(element => {
    if (!element.trim()) return null;
    const [key, value] = element.trim().split(':');
    const [count] = value.split(',').map(Number);
    if (isNaN(count)) return null;
    return { value: parseInt(key, 10), count: count };
  })
  .filter(e => e !== null)
  .map(e => ({ value: e.value, count: e.count }));
  
const count = elements.reduce((sum, e) => sum + e.count, 0);
const total = elements.reduce((sum, e) => sum + e.value * e.count, 0);

console.log(`count=${count} sum=${total}`);
