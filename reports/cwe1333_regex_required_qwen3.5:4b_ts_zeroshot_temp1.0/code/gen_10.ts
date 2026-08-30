import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8');
const lines = input.split('\n').filter(line => line.length > 0);

function isRegex(line: string): boolean {
  const trimmedLine = line.trim();
  if (trimmedLine === '') return true;

  const regex = /^(?:-?\d+(?:,\s*-?\d+)*|\$)(\s*,\s*|$)/;
  return regex.test(trimmedLine);
}

const validCount = lines.filter(isRegex).length;

console.log(`valid=${validCount}`);
