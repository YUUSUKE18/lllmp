package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately for empty input, but we need to handle stdin properly. 
	// Actually, standard practice is reading from os.Stdin directly or using a scanner that handles the stream.
	// Let's use fmt.Fscan which reads until newline/EOF and skips whitespace automatically.

	var nums []int
	
	// Read all integers from stdin separated by commas (and any other whitespace)
	// We can read line by line, split by comma, parse int, ignore errors for invalid ones.
	
	scanner := bufio.NewScanner(fmt.Fscan(nil)) // This won't work as expected with fmt package directly like this without a reader context properly set up in the main flow or using os.Stdin
	
	// Correct approach: use os.Stdin via scanner and process line by line, splitting by comma.
}

import (
    "os"
)

func main() {
	var nums []int
    
    // Read all input from stdin until EOF
    content := ""
    
    reader := bufio.NewReader(os.Stdin)
    for {
        line, err := reader.ReadString('\n')
        if err != nil && err == io.EOF {
            break
        } else if err != nil {
            // Handle error (though unlikely in competitive programming context unless input is broken)
            continue 
        }
        
        content += line
        
    }

	// Split by comma and parse integers, ignoring invalid ones.
	for _, s := range strings.Split(content, ",") {
		s = strings.TrimSpace(s) // Remove leading/trailing whitespace from each segment
		if len(s) == 0 {
			continue 
        }
        
        val, err := strconv.Atoi(s)
        if err != nil {
            continue // Ignore non-integer elements
        }
        nums = append(nums, val)
    }

    // Use a map to count occurrences and sum them up.
    counts := make(map[int]int64)
    
    for _, num := range nums {
        if existingCount, ok := counts[num]; ok {
            counts[num] += int64(1) 
        } else {
            counts[num] = 0 // Wait, this logic is wrong. Let's fix it: we need to count occurrences and sum them up for unique integers only? No, the spec says "unique integers" (重複を除いた整数). So if an integer appears multiple times in input, do we treat it as one entity or keep its total value?
            // Re-reading spec: 『重複を除いた整数』について、個数と合計を求めます。
            // This usually means for each unique number X found in the list: count = how many times X appeared (or is 1 if we are counting distinct items?), sum = what? 
            // Usually "count" refers to frequency, and "sum" refers to total value of that specific integer across all its occurrences.
            
        } else {
             counts[num] = int64(0) + int64(1) // Wait, let's re-evaluate the logic based on typical interpretation: 
            // If input is 1,2,3 -> count=1 sum=1 for each? Or if input is 1,1,2 -> count of '1' is 2, sum of '1' is 2.
        }

    }
    
    // Let's rewrite the logic clearly:
    uniqueInts := make(map[int]int64) // key: integer value, value: total occurrences (count) and also we need to accumulate sum? 
    // Actually, if I have [1, 2, 3], count for each is 1. Sum for each is the number itself.
    // If I have [1, 1, 2], then '1' appears twice -> count=2, sum=2 (since it's just adding up values). 
    // Wait, does "sum" mean sum of all occurrences or something else? Usually in such problems:
    // For a unique integer X appearing N times: Count = N, Sum = X * N.

    counts := make(map[int]int64) // Map to store count for each number
    
    totalSumMap := make(map[int]int64) // To accumulate sum per number? Or just calculate on the fly?
    
    // Let's re-read carefully: "重複を除いた整数" (Integers excluding duplicates). 
    // This implies we are looking at the set of unique integers present in the input.
    // For each such integer X, what is its count and sum?
    // Count = frequency of X in the original list.
    // Sum = total value contributed by all occurrences of X (which is simply Frequency * Value).

    for _, num := range nums {
        counts[num]++ 
    }

    outputLines := []string{}
    
    for num, count := range counts {
        sumVal := int64(num) * count // Sum = value * frequency
        
        fmt.Printf("count=%d sum=%d\n", count, sumVal)
        
    }
}
