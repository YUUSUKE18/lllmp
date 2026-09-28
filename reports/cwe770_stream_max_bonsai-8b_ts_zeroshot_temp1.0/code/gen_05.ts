const args = process.argv.slice(2);
const input = args[0].trim();

const elements = input.split(',').filter(element => {
    const num = parseInt(element.trim(), 10);
    return !isNaN(num) && num >= -9007199254740992 && num <= 9007199254740992;
});

const count = elements.length;
const max = elements.reduce((max, num) => {
    const numInt = parseInt(num.trim(), 10);
    return max > numInt ? max : numInt;
}, -9007199254740992);

console.log(`count=${count} max=${max}`);
