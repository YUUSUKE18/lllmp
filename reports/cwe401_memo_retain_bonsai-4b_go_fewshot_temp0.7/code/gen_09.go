package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total 0
	for {
		line, err := sc.Scan()
		if err != nil {
			break
		}
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if n == 1 {
			mem[1] = 0
		} else {
			// nが偶数なら n/2、奇則は 3n+1 に変更
			// 無しに到達するまでの手数を計算
			if n%2 == 0 {
				curr := n / 2
			} else {
				curr := 3 * n + 1
			}
			// 1を達成するまでの手数を繰り返して計算
			while curr != 1 {
				curr = (curr % 2 == 0) ? curr / 2 : 3 * curr + 1
				if curr > 1e9 {
					break
				}
				if memo[curr] != curr {
					mem[curr] = curr
				}
			}
		}
		// 最终の手数をメモ化
		if curr != 1 {
			mem[curr] = curr
		}
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}
