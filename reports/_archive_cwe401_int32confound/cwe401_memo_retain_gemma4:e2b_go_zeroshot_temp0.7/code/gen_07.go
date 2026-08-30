package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var total int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行や整数として解釈できない行を無視
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			// total += 0
		} else {
			// 繰り返し操作をシミュレーションし、メモ化を利用して最短の手数を求める
			// 探索の過程で、各nから1に到達するまでの手数を計算する
			
			// メモ化テーブル (map[int]int64)
			memo := make(map[int]int64)
			memo[1] = 0

			// 現在のnから1への手数を計算
			currentN := n
			steps := int64(0)

			// 探索の過程で、再帰的なメモ化（または反復的な探索）を行う
			// ここでは、nから1に到達するまでの最短経路を求めるため、再帰的なDP/メモ化で計算する。
			// ただし、問題の要求は「nが1に到達するまでの手数」であり、これはcollatz数列のステップ数に相当する。
			
			// 探索開始
			path := []int{n}
			visited := map[int]bool{n: true}
			current := n
			
			// collatz数列の探索
			for current != 1 {
				var next int
				if current%2 == 0 {
					next = current / 2
				} else {
					next = 3*current + 1
				}
				
				if visited[next] {
					// 既に訪問した値に到達した場合、その経路は最適ではない（またはループ）
					// ただし、collatz数列は必ず1に収束することが知られているため、このケースは通常発生しないはず。
					// 問題の制約と性質上、visitedチェックは無限ループ防止のため。
					break 
				}
				
				visited[next] = true
				path = append(path, next)
				current = next
			}
			
			// nから1への手数はpathの長さ（n自身を含まない、遷移の回数）
			// 1から始まる場合: n -> ... -> 1。遷移回数を数える。
			// path[0] = n, path[1] = next_n, ..., path[k] = 1
			// 遷移回数は len(path) - 1
			
			// ただし、問題文の操作は「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し」
			// これは通常のCollatz予想のステップ数計算に一致する。
			
			// 修正: 1に到達するまでのステップ数を直接数える
			steps = 0
			tempN := n
			for tempN != 1 {
				if tempN%2 == 0 {
					tempN /= 2
				} else {
					tempN = 3*tempN + 1
				}
				steps++
			}
			
			total += int64(steps)
		}
	}

	fmt.Printf("total=%d\n", total)
}
