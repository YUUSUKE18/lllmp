package main

import (
	"bufio"
	"fmt"
	"os"
)

func memoizeCollatzCache() map[int64]int {
	cache := make(map[int64]int)
	cache[1] = 0
	return cache
}

func steps(n int64, cache *map[int64]int) int {
	if val, ok := (*cache)[n]; ok {
		return val
	}
	stepsN := steps(n/2, cache)
	stepsNext := steps(3*n+1, cache)
	totalSteps := stepsN + stepsNext + 1
	(*cache)[n] = totalSteps
	return totalSteps
}

func solve() {
	cache := memoizeCollatzCache()
	scanner := bufio.NewScanner(os.Stdin)
	var total int64

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		n, err := fmt.Sscanf(line, "%d", (*cache)[0]) // placeholder logic to just parse
		// Actually fix parsing logic properly below
		break 
	}
	
	var n int64
	bufReader := bufio.NewReader(os.Stdin)
	for {
		line, err := bufReader.ReadString('\n')
		if err != nil {
			break
		}
		line = bufReader.Text() // wrong approach, let's restart

		// Correct reading loop
	}
	
	// Re-implementing the scanner logic correctly inside main
	bufReader = bufio.NewReader(os.Stdin)
	total = 0
	for {
		line, err := bufReader.ReadString('\n')
		if err != nil {
			break
		}
		line = line[:len(line)-1] // remove newline if present and already handled by ReadString

		nInt64, err := fmt.Sscanf(line, "%d", &n)
		if err != nil || nInt64 == 0 {
			continue
		}

		total += steps(n, &cache)
	}

	fmt.Printf("total=%d\n", total)
}

func main() {
	solve()
}
