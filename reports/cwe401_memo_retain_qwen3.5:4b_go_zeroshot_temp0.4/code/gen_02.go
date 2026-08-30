package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int)

	var total int64

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := fmt.Sscanf(line, "%d", &n)
		if n != 1 || err != nil {
			continue
		}

		step := 0
		for n > 1 {
			if v, ok := memo[n]; ok {
				step = v
				break
			}
			if n%2 == 0 {
				n = n / 2
			} else {
				n = 3*n + 1
			}
			step++
		}

		memo[step] = step // Store the total steps for this starting number if needed, but actually we need to store intermediate states.
		// Correction: The memoization should store the remaining steps from a state n.
		// However, since we are calculating from n down to 1, and the problem asks for total steps from the initial n,
		// we can just compute it directly or use memoization on the current value 'n'.
		// Let's re-evaluate the loop logic with proper memoization.

		// Re-calculate with correct memoization logic inside the loop or separate function.
	}
}
