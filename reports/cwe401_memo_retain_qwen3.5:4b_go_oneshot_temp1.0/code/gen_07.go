package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo map[int]int

func collatz(n int) int {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	steps := 0
	isEven := n%2 == 0

	for n != 1 {
		if isEven {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		steps++
		memo[n] = steps
		isEven = n%2 == 0
	}

	result := memo[n]
	for _, m := range memo {
		if result < m {
			result = m
		}
	}
	return result
}

func solve() int {
	mem := make(map[int]int)
	
	var total int
	sc := bufio.NewScanner(os.Stdin)
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		
		num, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		steps := 0
		tempN := num
		
		for tempN != 1 {
			isEven := tempN % 2 == 0
			if isEven {
				tempN = tempN / 2
			} else {
				tempN = 3*tempN + 1
			}
			steps++
			mem[tempN] = steps
		}

		currentSteps := mem[tempN]
		for _, m := range mem {
			if currentSteps < m {
				currentSteps = m
			}
		}
		
		total += currentSteps
	}

	return total
}

func main() {
	total := solve()
	fmt.Printf("total=%d\n", total)
}
