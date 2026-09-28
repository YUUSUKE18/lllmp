package main

import (
	"bufio"
	"fmt"
	"os"
)

func collatzStep(n int64) int64 {
	if n <= 0 {
		return 0
	}
	count := int64(1)
	current := n
	
	for current > 1 {
		if current%2 == 0 {
			current /= 2
		} else {
			current = 3*current + 1
		}
		count++
	}
	return count
}

func memoizedCollatzStep(n int64, memo map[int64]int64) int64 {
	if current := n; memo[current] > 0 {
		return memo[current]
	}
	
	result := collatzStep(n)
	
	for step := int64(1); step < result; step++ {
		n = n/2
		if n%2 != 0 {
			n = 3*n + 1
		}
		if memo[n] == 0 {
			memo[n] = memoizedCollatzStep(n, memo)
		} else {
			break
		}
	}
	
	memo[n] = result
	return result
}

func main() {
	mem := make(map[int64]int64)
	mem[1] = 0
	
	sc := bufio.NewScanner(os.Stdin)
	var total int64
	
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		
		n, err := fmt.Sscanf(line, "%d", &total) // 単一整数として読み込む
		if n == 1 && err == nil {
			steps := memoizedCollatzStep(total, mem)
			total += steps
		}
	}
	
	fmt.Printf("total=%d\n", total)
}
