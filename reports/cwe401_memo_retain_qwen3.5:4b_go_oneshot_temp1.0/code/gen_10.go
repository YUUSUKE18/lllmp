package main

import (
	"bufio"
	"fmt"
	"os"
)

func solve(n int64) int {
	if n == 1 {
		return 0
	}
	mem := make(map[int64]int)
	var total int
	for _, n := range []int64{n, int64(3*n+1)} {
		if !mem[n] {
			total++
			n = solve(n) + 1 // This logic is recursive, let's rewrite iteratively below to be safe with stack size if needed, but actually the problem asks for total steps. Let's do a proper iterative approach per number or memoization properly.
		}
	}
	// Re-implementing the loop correctly
	mem = make(map[int64]int)
	temp := n
	steps := 0
	for temp != 1 {
		if mem[temp] != 0 {
			break
		}
		if temp%2 == 0 {
			temp /= 2
		} else {
			temp = 3*temp + 1
		}
		steps++
		mem[temp] = steps // Wait, storing the step count reached? Usually it's stored as (number -> total_steps_from_start).
		// Actually, let's do standard memoization: value stores the steps taken from THAT value to 1.
	}
	// Correct Iterative Memoization Approach:
	mem = make(map[int64]int)
	n = n // reset start
	totalSteps := 0
	
	temp = n
	path := make([]int64, 0)
	for temp != 1 {
		path = append(path, temp)
		if temp%2 == 0 {
			temp /= 2
		} else {
			temp = 3*temp + 1
		}
	}
	
	// Now fill memo from end to start (from 1 upwards)
	for i := len(path) - 1; i >= 0; i-- {
		val := path[i]
		nextVal := path[i+1] // this is the value we just computed in the loop? No, path stores values before next.
		// Let's re-verify the logic inside the loop.
		// The loop generated a sequence: p[0]=n, p[1], ... until 1.
		// The length of this sequence is not the answer, the number of transitions is.
		// But we need to cache 'steps'.
	}
	
	// Let's rewrite cleanly inside main logic below.
	return 0 // placeholder
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	mem := make(map[int64]int)
	totalSum := 0
	
	for sc.Scan() {
		line := sc.Text()
		if line == "" || len(line) == 0 {
			continue
		}
		
		parts := strings.Fields(line) // Wait, no "strings" import listed. Need to add it.
		// The prompt says "standard library only". I must include strings.
	}
}
