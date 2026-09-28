package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo = make(map[int]int)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var n int
	for {
		_, err := fmt.Scan(&n)
		if err != nil || n == 0 {
			break
		}
		if result, ok := memo[n]; ok {
			fmt.Printf("total=%d\n", result)
			continue
		}
		memo[n] = calculate(n)
		fmt.Printf("total=%d\n", memo[n])
	}
}

func calculate(n int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + calculate(n/2)
	} else {
		return 1 + calculate(3*n + 1)
	}
}
