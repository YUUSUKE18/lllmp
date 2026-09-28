package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)

func handcount(n int) int {
	if memo[n] != nil {
		return memo[n]
	}
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		result := handcount(n / 2)
	} else {
		result := handcount(3*n + 1)
	}
	memo[n] = result + 1
	return result
}

var total = 0

func main() {
	sc := bufio.NewScanner(os.Stdin)
	for {
		line := sc.Scan()
		if line == "" {
			break
		}
		// 検証整数を読み
		nums := strings.Fields(line)
		for _, s := range nums {
			if s == "" {
				continue
			}
			val, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			if val > 0 {
				total += handcount(val)
			}
		}
	}
	fmt.Printf("total=%d\n", total)
}
