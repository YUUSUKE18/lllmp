package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	cache := make(map[int64]int)

	var total int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := fmt.Sscanf(line, "%d", &total) // This is a placeholder logic error in thought process, correct below:
		// Actually, let's re-read the spec carefully.
		// "標準入力に、1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）。"
		// "すべてのクエリの手数の合計を求めます。"
		
		// Correct parsing logic:
		var n int64
		if _, err := fmt.Sscanf(line, "%d", &n); err != nil {
			continue // Ignore lines that cannot be interpreted as integers
		}

		total += collatzStep(n, cache)
	}

	fmt.Printf("total=%d\n", total)
}

func collatzStep(n int64, cache map[int64]int) int {
	if n == 1 {
		return 0
	}
	
	val, ok := cache[n]
	if ok {
		return val
	}

	var steps int
	if n%2 == 0 {
		steps += 1 + collatzStep(n/2, cache)
	} else {
		steps += 1 + collatzStep(3*n+1, cache)
	}

	cache[n] = steps
	return steps
}
