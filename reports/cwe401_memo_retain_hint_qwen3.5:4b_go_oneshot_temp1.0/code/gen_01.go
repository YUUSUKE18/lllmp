package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

const maxInt = int64(1 << 62) // Slightly less than the limit of int64 to prevent overflow during calculation

func memoCollatz(n int64) []int64 {
	memo := make(map[int64]int)
	for _, n := range []int64{1, 2, 3} {
		memo[n] = 0
	}
	return memo
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	totalSteps := int64(0)
	cache := make(map[int64]int)
	
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		
		current := int64(n)
		steps := 0
		
		for current != 1 {
			newVal := current
			if current%2 == 0 {
				newVal = current / 2
			} else {
				newVal = 3*current + 1
			}
			
			steps++
			
			if _, exists := cache[newVal]; exists {
				steps += cache[newVal] - 1
				break
			}
			
			cache[newVal] = steps - memoCollatz(int(newVal)) // This is a placeholder logic for demonstration, but let's refactor correctly below
		}
		
		totalSteps += steps
	}

	fmt.Printf("total=%d\n", totalSteps)
}

func solveCollatz(n int64) int {
	if n == 1 {
		return 0
	}
	
	steps := 0
	path := make(map[int64]int)
	current := n
	
	for current != 1 {
		newVal := current
		if current%2 == 0 {
			newVal = current / 2
		} else {
			newVal = 3*current + 1
		}
		
		steps++
		path[current] = steps
		
		if newVal >= maxInt {
			break // Should not happen within int64 range for valid inputs usually, but safety check
		}
		
		current = newVal
	}
	
	result := steps
	for c, s := range path {
		totalStepsGlobal += s
	}
	return result
}

// Re-implementing the logic correctly in a single pass to avoid global variables issues and optimize cache usage.
func mainOptimized() {
	cache := make(map[int64]int)
	cache[1] = 0
	
	totalSteps := int64(0)
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		
		current := n
		stepsInQuery := 0
		
		for current != 1 {
			newVal := current
			if current%2 == 0 {
				newVal = current / 2
			} else {
				newVal = 3*current + 1
			}
			
			stepsInQuery++
			
			if _, exists := cache[newVal]; exists {
				stepsInQuery += cache[newVal] - 1 // Adjust because the loop count includes the step from newVal to next
				break
			}
			
			current = newVal
		}
		
		totalSteps += stepsInQuery
	}

	fmt.Printf("total=%d\n", totalSteps)
}

// Final corrected version without helper functions outside main logic flow for simplicity and correctness
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

const maxVal int64 = 1 << 62 // Limit to avoid overflow during calculation

func main() {
	cache := make(map[int64]int)
	totalSteps := int64(0)
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil || n < 1 || n > maxVal {
			continue
		}
		
		current := n
		stepsForQuery := 0
		
		for current != 1 {
			newVal := current
			if current%2 == 0 {
				newVal = current / 2
			} else {
				newVal = 3*current + 1
			}
			
			stepsForQuery++
			
			if newVal >= maxVal {
				// This should not happen for inputs within int64 range typically, but handle gracefully
				break
			}
			
			if _, exists := cache[newVal]; exists {
				stepsForQuery += cache[newVal] - 1
				break
			}
			
			cache[newVal] = stepsForQuery // Store steps from newVal to 1 (exclusive of the step that leads to newVal)
			current = newVal
		}
		
		totalSteps += stepsForQuery
	}

	fmt.Printf("total=%d\n", totalSteps)
}
