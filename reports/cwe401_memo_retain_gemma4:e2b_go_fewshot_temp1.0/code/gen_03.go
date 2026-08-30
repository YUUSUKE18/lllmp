package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// n=1 のときの手数は 0
			result := int64(0)
			total += result
			// メモ化
			memo[n] = result
			continue
		}

		// 再帰的計算とメモ化
		// nが偶数なら n/2, 奇数なら 3n+1
		var steps int64
		if n%2 == 0 {
			steps = int64(n / 2)
		} else {
			steps = int64(3*n + 1)
		}

		// 再帰的に次のステップを計算
		if steps == 1 {
			// 1 に到達した
			finalSteps := int64(0)
			total += finalSteps
			memo[n] = finalSteps
		} else {
			// nが1になるまで再帰的に処理する
			// この問題は、nを操作して1に到達するまでの回数を求める問題であり、
			// 実際の操作は以下の通り。
			// nが偶数: n -> n/2
			// nが奇数: n -> 3n+1
			// 1 に到達するまでの手数を求める。
			// これは、Collatzの予想に関連する問題であり、通常、1に到達するまでのステップ数を数える。
			// ここでは、nから1に到達するまでの操作の回数を数える。
			
			// 計算を再定義: nから1に到達するまでの操作回数を求める
			
			currentN := n
			count := int64(0)
			
			// 再帰的なメモ化を適用した計算
			for currentN != 1 {
				if val, ok := memo[currentN]; ok {
					// メモがあればそれを使う
					steps = val
					break
				}
				
				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				count++
			}
			
			// 最終結果をメモ化し合計に加算
			memo[n] = count
			total += count
		}
	}

	fmt.Printf("total=%d\n", total)
}
