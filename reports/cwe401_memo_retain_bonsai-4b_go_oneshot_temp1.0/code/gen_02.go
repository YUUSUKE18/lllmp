package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)

func countSteps(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != 0 {
		return memo[n]
	}
	if n%2 == 0 {
		result := countSteps(n / 2)
		if memo[n/2] == 0 {
			memo[n] = result + 1
		} else {
			memo[n] = memo[n/2] + 1
		}
		return result + 1
	} else {
		result := countSteps(3*n + 1)
		if memo[3*n+1] == 0 {
			memo[3*n+1] = result + 1
		} else {
			memo[3*n+1] = memo[3*n+1] + 1
		}
		return result + 1
	}
}

var totalSteps = 0

func main() {
	sc := bufio.NewScanner(os.Stdin)
	for {
		line := ""
		if !sc.Scan() {
			break
		}
		line = sc.Text()
		for _, s := range line {
			if s == " " || s == "\n" {
				continue
			}
			val, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			if val > 0 {
				if memo[val] == 0 {
					memo[val] = countSteps(val)
				}
				totalSteps += countSteps(val)
			}
		}
		if line == "" {
			break
		}
	}
	fmt.Printf("total=%d\n", totalSteps)
}
