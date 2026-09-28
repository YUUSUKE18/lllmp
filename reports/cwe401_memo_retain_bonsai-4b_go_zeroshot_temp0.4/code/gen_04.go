package main

import "fmt"

// memoizes the results of the Collatz function for a given n
var memo = make(map[int]int)

func collatz(n int) int {
	if memo[n] != 0 {
		return memo[n]
	}
	if n == 1 {
		return 1
	}
	if n%2 == 0 {
		result := collatz(n / 2)
	} else {
		result := 3 * n + 1
	}
	memo[n] = result
	return result
}

func main() {
	var total 0
	for {
		line := fmt.Scan()
		if line == "" {
			break
		}
		if _, err := fmt.Atoi(line); err == nil {
			n := int(line)
			if n == 1 {
				total += 0
			} else {
				// Count steps to reach 1
				steps := 0
				current := n
				for current != 1 {
					current = (current%2 == 0) ? current / 2 : 3 * current + 1
					steps++
				}
				total += steps
			}
		}
	}
	fmt.Println("total=", total)
}
