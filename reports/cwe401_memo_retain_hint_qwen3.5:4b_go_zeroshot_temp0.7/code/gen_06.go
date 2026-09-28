package main

import (
	"bufio"
	"fmt"
	"math/big"
	"os"
)

// memo stores the cycle length for each number encountered.
// Key: number, Value: steps to reach 1 from this number (including the step that reaches 1).
// We use big.Int because intermediate values can exceed 32-bit limits but fit in 64-bit.
var memo map[*big.Int]int

func main() {
	// Initialize memoization table with base case: 1 -> 0 steps
	memo = make(map[*big.Int]int)
	baseOne := big.NewInt(1)
	memo[baseOne] = 0

	// Reader for standard input
	reader := bufio.NewReader(os.Stdin)

	var totalSteps int64
	scanner := bufio.NewScanner(reader)

	for scanner.Scan() {
		line := scanner.Text()
		// Ignore empty lines or lines that cannot be parsed as integers
		if line == "" {
			continue
		}

		var n *big.Int
		err := big.NewInt(0).Scan(line)
		if err != nil {
			continue
		}

		steps, ok := getCycleLength(n)
		if !ok {
			// This case should not be reached if the input is valid integer >= 1
			totalSteps += -1 
			continue
		}

		totalSteps += int64(steps)
	}

	fmt.Printf("total=%d\n", totalSteps)
}

// getCycleLength calculates the number of steps to reach 1 from n using memoization.
func getCycleLength(n *big.Int) (int, bool) {
	if _, ok := memo[n]; ok {
		return memo[n], true
	}

	var steps int
	curr := n

	for curr.Cmp(big.NewInt(1)) != 0 {
		steps++
		next := new(big.Int)
		curr.Mod(next, big.NewInt(2)) // Even check: if remainder is 0, it's even

		if next.Sign() == 0 {
			// n is even: n / 2
			curr.Div(curr, big.NewInt(2))
		} else {
			// n is odd: 3n + 1
			// Calculate 3 * n + 1
			threeN := new(big.Int).Mul(curr, big.NewInt(3))
			threeN.Add(threeN, big.NewInt(1))
			curr = threeN
		}

		if _, ok := memo[curr]; ok {
			steps += memo[curr]
			break
		}
	}

	// If we reached 1 directly without hitting a known cycle,
	// we need to store the path. However, since we start from n and go down to 1,
	// and 1 is in memo with value 0, any step that reaches 1 will be recorded.
	// But wait, the logic above breaks if it hits a known node.
	// We need to ensure we store the result for all nodes visited in this path.

	// Re-evaluating the loop:
	// Let's recalculate steps from scratch to ensure correctness and storage.
	// Actually, the previous loop might have missed storing intermediate values that are not in memo but lead to known ones.
	// A safer approach is to traverse again or store during the first pass.

	// Let's rewrite the logic to be robust:
	steps = 0
	curr = n
	found := false
	
	for curr.Cmp(big.NewInt(1)) != 0 {
		if _, ok := memo[curr]; ok {
			steps += memo[curr]
			break
		}

		next := new(big.Int)
		curr.Mod(next, big.NewInt(2)) // Check parity correctly: if next is zero, curr was even.
		
		if next.Sign() == 0 {
			// Even
			curr.Div(curr, big.NewInt(2))
		} else {
			// Odd
			threeN := new(big.Int).Mul(curr, big.NewInt(3))
			threeN.Add(threeN, big.NewInt(1))
			curr = threeN
		}

		steps++
	}

	// Now we have reached 1. The steps count is correct.
	// We need to store the cycle length for every number that was part of this path?
	// Actually, the standard Collatz sequence calculation usually just computes it.
	// But the problem asks to memoize results. If n leads to m which leads to 1,
	// and m's result is known, then n's result is steps_to_m + m_result.
	// My previous loop did this correctly by breaking when a known node is hit.
	// The issue is that if we break early, we haven't stored the values for the nodes visited in this specific run 
	// that weren't previously known. However, since n >= 1 and decreases (or goes up then down),
	// eventually it hits 1 or a cycle (which is 1).
	// Wait, the Collatz conjecture states all reach 1.
	// The issue with my loop is: if I hit a known node, I add its stored steps.
	// But what about the nodes I just visited? They are not stored yet.
	// For memoization to work efficiently for repeated queries, we should store them.
	// However, storing every intermediate step might be memory intensive if the path is very long,
	// but the problem says "64bit integer range", implying paths aren't excessively long in terms of distinct numbers visited repeatedly?
	// Actually, the longest known cycle for 64-bit integers isn't that huge.
	// Let's refine the loop to store steps for every node visited in the current path if it wasn't already stored.

	steps = 0
	curr = n
	path := make([]*big.Int, 0)
	
	for curr.Cmp(big.NewInt(1)) != 0 {
		if _, ok := memo[curr]; ok {
			break
		}

		next := new(big.Int)
		curr.Mod(next, big.NewInt(2)) // Even check
		
		if next.Sign() == 0 {
			curr.Div(curr, big.NewInt(2))
		} else {
			threeN := new(big.Int).Mul(curr, big.NewInt(3))
			threeN.Add(threeN, big.NewInt(1))
			curr = threeN
		}

		path = append(path, curr) // Store current node before moving to next? No, store the one we just processed.
		steps++
	}

	// Now curr is 1.
	// We need to calculate total steps for this path.
	// Since we broke when hitting a known node or reached 1:
	// If we reached 1:
	if curr.Cmp(big.NewInt(1)) == 0 {
		// Add the stored step count for 1
		steps += memo[baseOne] // which is 0
	} else {
		// We hit a known node. The steps added so far are from n to that known node.
		// We need to add the stored result of that known node.
		// But how do we know which node was hit? 
		// The loop breaks immediately upon seeing a known node.
		// So 'curr' is the known node.
		steps += memo[curr]
	}

	// Store results for all nodes in the path that were not previously stored
	for _, node := range path {
		memo[node] = steps
	}

	return steps, true
}
