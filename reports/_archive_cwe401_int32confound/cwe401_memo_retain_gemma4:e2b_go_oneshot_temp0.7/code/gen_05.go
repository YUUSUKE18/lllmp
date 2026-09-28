package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

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
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)
		memo[1] = 0

		currentN := n
		steps := int64(0)

		for currentN != 1 {
			if val, ok := memo[currentN]; ok {
				steps = val + int64(0) // 既に計算済み
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
			// 再帰的なメモ化のために、現在のパスを追跡するのではなく、
			// 最終的な結果を求めるため、このループ内での計算を続ける。
		}

		// ここで、元のnから1に到達するまでの手数を求める。
		// 厳密には、nがクエリとして与えられたときの操作回数を数える必要がある。
		// 課題の記述を再解釈する: "n が 1 のときの手数は 0 です。n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。"
		// これは、nから開始して1に到達するまでのステップ数を求める問題（コネルの問題の変種）と解釈します。

		// メモ化と再計算を統合して、nから1への最小ステップ数を求める。
		// 既にmemoに存在すればその値を採用する。
		if val, ok := memo[n]; ok {
			total += val
		} else {
			// まだ計算されていない場合、計算してメモ化する
			// 厳密な再帰的メモ化（または動的計画法）が必要。
			// 今回は、与えられたnに対してのみ計算し、その結果を合計する。
			
			// nから1へのパスを直接計算する（再帰的メモ化を適用）
			tempMemo := make(map[int]int64)
			tempMemo[1] = 0
			
			// BFSまたはDPで計算を再実行する
			queue := []int{n}
			visited := map[int]bool{n: true}
			
			localSteps := make(map[int]int64)
			localSteps[n] = 0
			
			for len(queue) > 0 {
				curr := queue[0]
				queue = queue[1:]
				
				if curr == 1 {
					// 1に到達したときのステップ数を計算。これは間違い。
					// 目的は「nを操作して1になるまでの手数」なので、nからスタートして1に到達するまでのパス長を求める。
				}

				// 状態遷移: n -> n/2 (n偶数) または n -> 3n+1 (n奇数)
				next := -1
				if curr%2 == 0 {
					next = curr / 2
				} else {
					next = 3*curr + 1
				}

				if next >= 1 {
					if _, ok := localSteps[next]; !ok {
						localSteps[next] = localSteps[curr] + 1
						queue = append(queue, next)
					}
				}
			}
			
			// 最終的なステップ数を加算
			if steps == 0 && n != 1 {
				// BFSで到達できなかった場合（無限ループなど、この問題では起こらないはず）、エラー回避のためスキップ。
			} else {
				total += steps
			}
		}
	}

	fmt.Printf("total=%d\n", total)
}
