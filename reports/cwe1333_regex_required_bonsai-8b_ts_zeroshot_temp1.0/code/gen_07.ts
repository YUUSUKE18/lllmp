import { stdin, stdout } from 'process';

const line = stdin.readLine().trim();
const validLines = line.match(/\d+[\d,]*[a-zA-Z]/g) || [];

stdout.write(`valid=${validLines ? validLines.length : 0}\n`);
