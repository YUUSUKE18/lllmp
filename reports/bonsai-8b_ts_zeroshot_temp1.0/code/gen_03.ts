import { Readable, ReadText } from 'stream';

const input = Readable.from(process.stdin);

input.pipe(
  ReadText(),
  process.stdin.readable().pipe(
    function (data) {
      const numbers = data
        .split(',')
        .map((str) => str.trim())
        .filter((str) => !isNaN(str) && str !== '');
      const uniqueNumbers = [...new Set(numbers)];
      const count = uniqueNumbers.length;
      const sum = uniqueNumbers.reduce((acc, num) => acc + parseInt(num), 0);
      console.log(`count=${count} sum=${sum}`);
    }
  )
);

input.on('end', () => {
  const remaining = input.buffer;
  if (remaining) {
    const lastChunk = remaining.slice(0, remaining.length - 1);
    const lastPart = lastChunk
      .split('')
      .map((ch) => ch)
      .join('');
    const count = uniqueNumbers.length;
    const sum = uniqueNumbers.reduce((acc, num) => acc + parseInt(num), 0);
    console.log(`count=${count} sum=${sum}`);
  }
});
