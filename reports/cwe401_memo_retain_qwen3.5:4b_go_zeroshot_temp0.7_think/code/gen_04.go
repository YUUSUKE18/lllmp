```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

// Memoization map to store the number of steps for each integer
var memo = make(map[int64]int)

func main() {
	// Initialize memo with base case: n=1 takes 0 steps
	memo[1] = 0

	reader := bufio.NewReader(os.Stdin)
	total := int64(0)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		// Remove newline character if it exists (ReadString includes the delimiter)
		if line == "\n" || strings.TrimSpace(line) == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		steps := calcSteps(n)
		total += int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}

func calcSteps(n int64) int {
	if v, ok := memo[n]; ok {
		return v
	}

	nextVal := n / 2
	if n%2 != 0 {
		nextVal = 3*n + 1
	}

	steps := calcSteps(nextVal) + 1
