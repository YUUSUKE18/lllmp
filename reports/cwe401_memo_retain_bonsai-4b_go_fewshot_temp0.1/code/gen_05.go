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
	var numbers []int
	for {
		n, err := sc.Scan()
		if err != nil {
			break
		}
		if err == io.EOF {
			break
		}
		// 1 以上の整数を1行に1値ずつ読み取る
		if n == 0 {
			break
		}
		// 1 以上の整数を分割して読み取る
		for i := 0; i < n; i++ {
			val, err := strconv.Atoi(sc.Text().TrimLeft())
			if err != nil {
				break
			}
			if val == 0 {
				break
			}
			if val > 0 {
				// n が1の場合は0
				if val == 1 {
					break
				}
				// 偶数ならn/2、奇数なら3n+1
				if val%2 == 0 {
					val = val / 2
				} else {
					val = 3*val + 1
				}
				// 1に達するまでの手数を計算
				handsh = calcHandsh(val)
				if handsh > 0 {
					// 1～nの手数をメモ化
					memo[val] = handsh
				}
			}
		}
		if len(numbers) == 0 {
			break
		}
		// すべてのクエリの手数を合計
		for _, n := range numbers {
			if memo[n] > 0 {
				handsh := memo[n]
			} else {
				handsh := 0
			}
			handsh += calcHandsh(n)
		}
		fmt.Printf("total=%d\n", handsh)
	}
}

func calcHandsh(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] > 0 {
		return memo[n]
	}
	// 偶数ならn/2、奇数なら3n+1
	var next int
	if n%2 == 0 {
		next = n / 2
	} else {
		next = 3*n + 1
	}
	// 1まで手数を繰り返す
	return 1 + calcHandsh(next)
}
