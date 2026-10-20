import { Readable, ReadText } from 'stream';

const input = Readable.from(process.stdin);
const result = ReadText();

input.pipe(result)
  .on('end', () => {
    const data = result.read().trim().split(',').filter(Boolean);
    const uniqueNumbers = data
      .map(Number)
      .filter(n => !isNaN(n))
      .Set()
      .SymbolIterator();

    const count = 0;
    let sum = 0;

    for await (const num of uniqueNumbers) {
      count++;
      sum += num;
    }

    console.log(`count=${count} sum=${sum}`);
  });
