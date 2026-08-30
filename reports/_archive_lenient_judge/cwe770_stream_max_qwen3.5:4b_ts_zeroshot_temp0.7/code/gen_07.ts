import { Readline } from 'readline';

const rl = new Readline(process.stdin);

rl.on('line', async (input) => {
    const elements = input.split(',').map((s: string) => Number(s));
    
    if (elements.length === 0 || !Array.isArray(elements)) {
        console.log(`count=0 max=`);
        return;
    }

    let count = elements.filter(e => typeof e === 'number' && isFinite(e)).length;
    const maxValue: number | undefined = count > 0 
        ? Math.max(...elements) as any 
        : undefined;

    if (maxValue !== undefined) {
        console.log(`count=${count} max=${maxValue}`);
    } else {
        console.log(`count=0 max=`);
    }
});
