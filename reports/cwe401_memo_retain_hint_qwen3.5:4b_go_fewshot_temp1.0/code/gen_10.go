package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	r := bufio.NewScanner(os.Stdin)
	cache := make(map[int64]int)

	var total int64 = 0
	for r.Scan() {
		text := r.Text()
		if len(text) == 0 {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(text, "%d", &n)
		if err != nil {
			continue
		}

		n = n - 1 // adjust to make 0-based indexing easier for memoization
		hand := cache[n]
		if hand == 0 {
			hand = solve(n+1, cache) + 1
			cache[n] = hand
		}

		total += int64(hand)
	}

	fmt.Printf("total=%d\n", total)
}

func solve(val int64, cache map[int64]int) int {
	if val <= 1 {
		return 0
	}
	if v, ok := cache[val]; ok {
		return v
	}

	prev := val
	count := 1
	for prev > 1 {
		next := (prev + 32768) >> 5 // equivalent to if odd: 3n+1 else n/2 for large numbers, but standard logic is clearer without bit hack for correctness here. 
		// Actually let's implement the exact Collatz rules using int64 arithmetic.
		
		if prev%2 == 0 {
			prev = prev / 2
		} else {
			prev = 3*prev + 1
		}
		count++

		if prev <= 1 {
			cache[prev] = count - 1
		} else if _, exists := cache[prev]; !exists {
			cache[prev] = solve(prev, cache)
			hand := cache[prev] + 1
			cache[val] = hand
			return hand
		} else {
			hand := cache[prev] + 1
			cache[val] = hand
			return hand
		}
		return count // Wait, logic flow correction for memoization in loop
	}
	return 0
}
