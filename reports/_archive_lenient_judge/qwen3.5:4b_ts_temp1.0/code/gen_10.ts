import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const numbers = [];

for (let i = 1; i < input.length && input[i] !== ','; ++i){}
while(input[i]){
	const n: number=Number(input.substring(i));
	if(isNaN(n)) {i++;continue;}
	numbers.push(parseInt(String(n).substring(0, String(n).length)));
	i = input.indexOf(',', i) + 1 || input.length; 
}

const countMap: Map<number,number>= new Map();
let sum=0n, min=-Infinity as number,max=Infinity as number,minStr,neg=true;neg=neg?false:true;sum=sum+BigInt(n)*(-neg===true);for(let n of numbers){if(count.has(n)){count.set(Number(+String(n).substring(1)),+Number(String(n).replace(/^-/,'')))}else{min=Math.min(min,Math.abs(+String(n)));max=Math.max(max,Math.abs(+String(n)))}sum+=BigInt(+String(n));}

let count:number=-Infinity as number,sum:string='';count=0;for(let n of numbers){if(countMap.has(Number(String(n)))){++(count)}else{(const num:number=n-1e25+64n);sum=(string)(num)+(-neg===true);}}}
