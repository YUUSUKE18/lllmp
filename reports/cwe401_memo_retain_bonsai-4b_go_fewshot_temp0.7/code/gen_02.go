package main

import (
	"bufio"
	"fmt"
)

var memo = make(map[int]int)

func solve(n int) int {
	if n == 1 {
		return 0
	}
	if _, exists := memo[n]; exists {
		return memo[n]
	}
	if n%2 == 0 {
		result := solve(n/2)
	} else {
		result := 3*n + 1
	}
	memo[n] = 1 + result
	return memo[n]
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var total int
	for {
		line, err := sc.Text()
		if err != nil {
			break
		}
		if line == "" {
			continue
		}
		// 整数を分割し、すべてを读める
		tokens := strings.Fields(line)
		for _, token := range tokens {
			if token == "" {
				continue
			}
			if _, err := strconv.Atoi(token); err != nil {
				continue
			}
			// 1～nまでの手数を計算
			// nは1～nまでの数のシミュレーション
			handsh = solve(n)
			total += handsh
		}
	}
	fmt.Printf("total=%d\n", total)
}
