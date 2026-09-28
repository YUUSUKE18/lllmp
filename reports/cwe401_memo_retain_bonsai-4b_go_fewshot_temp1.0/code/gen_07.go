package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo = make(map[int]int)
var total  = 0

func processQuery(n int) int {
	if _, exists := memo[n]; exists {
		return memo[n]
	}
	if n == 1 {
		result := 0
	} else if n%2 == 0 {
		result := n / 2
	} else {
		result := 3*n + 1
	}
	memo[n] = result
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	for {
		line := ""
		if !sc.Scan() {
			break
		}
		if line == "" {
			continue
		}
		if line == "1" {
			n := 1
		} else {
			n, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			if n == 0 {
				continue
			}
		}
		if n == 1 {
			// n=1 は手数=0
		} else {
			// 1番目の手数は計算
			result := processQuery(n)
			total += result
		}
	}
	fmt.Printf("total=%d\n", total)
}
