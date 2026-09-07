package main

import (
	"fmt"
	"sort"
)

func main() {
	var total int
	numbers := make([]int, 0)

	for {
		input := bufio.NewReader(os.Stdin)
		inputString, err := input.ReadString('\n')
		if err != nil {
			break
		}

		inputInt, err := strconv.Atoi(strings.TrimSpace(inputString))
		if err != nil {
			continue
		}

		if inputInt == 0 {
			break
		}

		total += countCollatz(inputInt)
	}

	fmt.Printf("total=%d\n", total)
}

func countCollatz(n int) int {
	if n == 1 {
		return 0
	}

	memo := make(map[int]int)
	return countCollatzMemo(n, memo)
}

func countCollatzMemo(n int, memo map[int]int) int {
	if result, exists := memo[n]; exists {
		return result
	}

	memo[n] = 1 + countCollatzMemo(n/2, memo)
	if n%2 != 0 {
		memo[n] += 1 + countCollatzMemo(3*n+1, memo)
	}

	return memo[n]
}
