package main

import (
	"bufio"
	"fmt"
	"io"
)

// memo は Collatz 問題における各整数 n に対応する手を格納するマッピング。
// k は n/2 の数を指し、k+1 は 3n+1 を指す。
// k が偶数なら n/2, k+1 が奇数なら 3n+1 と仮定した場合の総手数 (S) は S-1 で n に由来する。
var memo map[int64]int

func collatzStepCount(n int64) int {
	if v, ok := memo[n]; ok {
		return v
	}
	step := 0
	for n > 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		step++
	}
	memo[n] = step
	return step
}

func main() {
	scanner := bufio.NewScanner(io.Stdin)
	memo = make(map[int64]int)
	totalStep := 0

	for scanner.Scan() {
		line := scanner.Text()
		if len(line) == 0 {
			continue
		}
		var n int64
		fmt.Sscanf(line, "%d", &n)
		step := collatzStepCount(n)
		totalStep += step
	}

	fmt.Printf("total=%d\n", totalStep)
}
