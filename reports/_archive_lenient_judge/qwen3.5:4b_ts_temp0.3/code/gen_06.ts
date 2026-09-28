const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 sum=');
} else {
    const numbers = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    
    if (numbers.length === 0) {
        console.log('count=0 sum=');
    } else {
        const uniqueNumbers = new Set(numbers);
        
        let count = 0;
        for (const num of numbers) {
            count++;
        }

        // Calculate the total by iterating over unique numbers and multiplying by their counts.
        // Or simply sum all original numbers since duplicates are counted individually in 'sum' context? 
        // Re-reading spec: "重複を除いた整数について、個数と合計を求めます" (For integers with duplicates removed, find count and total).
        // This usually means the set of unique values. Count = size of set. Sum = sum of elements in that set.
        
        let sum = 0;
        for (const num of uniqueNumbers) {
            sum += num;
        }

        console.log(`count=${uniqueNumbers.size} sum=${sum}`);
    }
}
