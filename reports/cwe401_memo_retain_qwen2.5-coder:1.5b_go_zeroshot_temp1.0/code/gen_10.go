package main

import (
	"fmt"
	"sync"
)

func main() {
	const maxInt int = 1<<31 - 1

	var memo map[int]int = make(map[int]int)
	var wg sync.WaitGroup

	for {
		var q int
		fmt.Scan(&q)

		if q == 0 {
			break
		}

		wg.Add(1)
		go func(q int) {
			defer wg.Done()
			total := process(q)
			fmt.Printf("total=%d\n", total)
		}(q)
	}

	wg.Wait()
}

func process(n int) int {
	if n == 0 {
		return 0
	}

	if memo[n] != 0 {
		return memo[n]
	}

	if n%2 == 0 {
		total := process(n / 2) + 1
		memo[n] = total
		return total
	} else {
		total := process(3*n + 1) + 1
		memo[n] = total
		return total
	}
}
