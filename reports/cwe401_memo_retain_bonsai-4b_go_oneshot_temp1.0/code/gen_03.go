package main

import (
	"bufio"
	"fmt"
)

var memo = make(map[int]int)

func countSteps(n int) int {
	if memo[n] != nil {
		return memo[n]
	}
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		result := countSteps(n / 2)
	} else {
		result := countSteps(3*n + 1)
	}
	memo[n] = result + 1
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var totalSteps int
	for {
		line := ""
		if !sc.NextLine() {
			break
		}
		line = sc.Text()
		if strings.TrimSpace(line) == "" {
			continue
		}
		numbers := strings.Fields(line)
		for _, s := range numbers {
			if strings.TrimSpace(s) == "" {
				continue
			}
			val, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			if val <= 0 {
				continue
			}
			totalSteps += countSteps(val)
		}
		if len(numbers) == 0 {
			break
		}
	}
	fmt.Printf("total=%d\n", totalSteps)
}
