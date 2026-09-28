import { Readable } from 'stream';

const input = Readable.from(process.stdin);

input.on('line', line => {
  const elements = line.split(',').map(e => e.trim());
  const validIntegers = elements
    .filter(e => /^\d+$/.test(e))
    .map(e => parseInt(e, 10));
  
  const count = validIntegers.length;
  const max = validIntegers.length === 0 ? undefined : Math.max(...validIntegers);
  
  if (max === undefined) {
    console.log('count=<0> max=<undefined>');
  } else {
    console.log(`count=${count} max=${max}`);
  }
});
