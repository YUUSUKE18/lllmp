package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo = make(map[int]int)
var total = 0

func main() {
	sc := bufio.NewScanner(os.Stdin)
	for {
		n, err := sc.Scan()
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		if err != nil {
			break
		}
		// すべての非空の整数を処理
		for i := 0; i < n; i++ {
			val := 0
			if _, err := strconv.Atoi(sc.Text().Substring(sc.Position(i), n)); err != nil {
				break
			}
			if val == 0 {
				break
			}
			// 1 に到達するまでの手数を計算
			// n が偶数なら n/2 、奇則は 3n+1 に置き換え
			// これを繰り返し処理
			// まず、n が1なら手数=0
			if n == 1 {
				continue
			}
			// メモ化で避免
			if memo[val] != nil {
				continue
			}
			// 1を達にまでの手数を計算
			handNum := 0
			curr := val
			// 動かす数を1に至るまでの処理
			for curr != 1 {
				if curr%2 == 0 {
					curr = curr / 2
				} else {
					curr = 3 * curr + 1
				}
				if curr == 1 {
					break
				}
			}
			handNum = curr - 1
			// なぜなら、記録
			memo[curr] = handNum
			total += handNum
		}
		if err != nil {
			break
		}
	}
	fmt.Printf("total=%d\n", total)
}
