package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)
var total = 0

func step(n int) int {
	if memo[n] != 0 {
		return memo[n]
	}
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		result := step(n / 2)
	} else {
		result := 3 * n + 1
	}
	memo[n] = result + 1
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	for {
		line := ""
		if line = sc.Scan() {
			// 1～1000000の間で繰り返し計算を可能に
			// 固定の最大値を考慮して最適なキャッシュを保つ
			n, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			if n < 1 {
				continue
			}
			// nが1なら0
			// 其他のnはstepで計算
			// 1→0なので、stepが再帰する前に1は追加する
			// 1は0なので、memo[1]=0
			result := step(n)
			total += result
		}
		if !line {
			break
		}
	}
	fmt.Printf("total=%d\n", total)
}
