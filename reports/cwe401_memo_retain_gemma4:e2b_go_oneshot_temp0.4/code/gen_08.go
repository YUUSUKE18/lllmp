package main

import (
	"bufio"
	"fmt"
	"os"
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

		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n == 1 {
			total += 0
			continue
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		// 再帰または反復計算
		currentN := n
		steps := int64(0)
		path := []int{}

		// 1に到達するまでの経路を追跡し、メモ化のために逆順で計算する
		// ただし、ここでは単純に到達までのステップ数を求めるため、再帰的なメモ化（または反復的な計算）を用いる。

		// 経路追跡とメモ化を組み合わせた計算
		// 1に到達するまでの手数を求める
		
		// 経路を追跡しながら計算し、ループを避けるため、到達までのステップ数を直接計算する。
		// 3n+1, n/2 の操作は、Collatz予想に関連する操作である。
		
		// 1に到達するまでのステップ数を求めるための反復計算
		tempN := n
		count := int64(0)
		
		// 1に到達するまで繰り返す
		for tempN != 1 {
			if tempN == 0 { // 0は入力制約上ありえないが念のため
				break
			}
			if tempN%2 == 0 {
				tempN /= 2
			} else {
				tempN = 3*tempN + 1
			}
			count++
		}

		total += count
		memo[n] = count
	}

	fmt.Printf("total=%d\n", total)
}
