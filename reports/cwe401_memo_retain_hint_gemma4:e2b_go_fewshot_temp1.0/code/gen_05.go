package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total int64 = 0
	memo := make(map[int]int64)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// n=1 のときは手数は 0
			result := int64(0)
			total += result
			// メモ化
			memo[n] = result
			continue
		}

		// 再帰的または動的計画法で計算
		// nが偶数なら n/2、奇数なら 3n+1
		var steps int64 = 0
		currentN := n

		for currentN != 1 {
			if val, ok := memo[currentN]; ok {
				steps += val
				break
			}
			
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}
		
		// 計算結果をメモ化し、合計に加算
		memo[n] = steps
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
