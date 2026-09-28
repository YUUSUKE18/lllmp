package main

import (
	"fmt"
	"math"
	"os"
	"strings"
)

var memo = make(map[int]int)

func computeSteps(n int) int {
	if n == 1 {
		return 0
	}
	if steps, ok := memo[n]; ok {
		return steps
	}

	// 次のステップを計算
	if n%2 == 0 {
		next := n / 2
	} else {
		next := 3*n + 1
	}

	// ステップを記録
	memo[n] = 1 + computeSteps(next)

	return memo[n]
}

func main() {
	var total = 0
	for {
		line := os.Stdin.ReadString(1)
		if !line {
			break
		}
		line = strings.TrimSpace(line)
		if len(line) == 0 {
			continue
		}
		if num, err := strconv.Atoi(line); err != nil {
			continue
		}
		if num < 1 {
			continue
		}
		total += computeSteps(num)
	}
	fmt.Printf("total=%d\n", total)
}
