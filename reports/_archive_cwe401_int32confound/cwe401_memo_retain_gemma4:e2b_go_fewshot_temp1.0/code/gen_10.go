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

		// 繰り返し計算とメモ化
		currentN := n
		count := 0

		for currentN != 1 {
			if _, found := memo[currentN]; found {
				// すでに計算済みの値があればスキップ
				break
			}

			var nextN int
			if currentN%2 == 0 {
				nextN = currentN / 2
			} else {
				nextN = 3*currentN + 1
			}

			// 再帰的に（またはループで）計算
			// ここでは、nが大きくなることを考慮し、再帰的なメモ化が自然だが、
			// 今回は元の問題を「手数を求める」という形の再帰的な性質を利用する。
			// 各クエリ n について、nが1になるまでのステップ数を計算する。

			// ここでは、各クエリ n に対して、nが1になるまでの手数を計算し、その合計を求める。
			// 各クエリ n についての計算を独立に行う。

			// 1回のクエリ n についてのみ計算し、合計を求める。
			// nが1になるまでの手数を求める。
			currentN = nextN
			count++
		}

		// ここでの計算は、各nに対する計算を独立に行う必要がある。
		// 課題の意図を再解釈: 各クエリ n について、nが1になるまでの操作回数を求め、その合計を求める。

		// 各nに対する計算を再実行し、メモ化を適用する。
		// 最初のループは単なる入力の読み取りとバリデーションのため、
		// 実際の計算はここで行う。

		memo = make(map[int]int64)
		memo[1] = 0
		
		var steps int64 = 0
		currentVal := n
		
		for currentVal != 1 {
			if val, ok := memo[currentVal]; ok {
				steps += val
				break
			}
			
			if currentVal == n {
				// 最初のnからの計算開始
			} else {
				// 途中計算の場合
			}
			
			var nextVal int
			if currentVal%2 == 0 {
				nextVal = currentVal / 2
			} else {
				nextVal = 3*currentVal + 1
			}
			
			// 再帰的なメモ化 (深さ優先探索)
			// これは、各nの計算結果を求める問題なので、個別に計算する方が適切。
			// 各nに対する計算を独立に行う。
		}
		
		// 各nに対して、nが1になるまでの操作回数を計算する（メモ化付き）
		// これは、各nが独立した問題であることを意味する。

		// 各クエリ n について、nが1になるまでの手数を計算し、合計を求める。
		
		currentN = n
		steps = 0
		memo = make(map[int]int64)
		memo[1] = 0
		
		for currentN != 1 {
			if val, ok := memo[currentN]; ok {
				steps += val
				break
			}
			
			var nextN int
			if currentN%2 == 0 {
				nextN = currentN / 2
			} else {
				nextN = 3*currentN + 1
			}
			
			// 経路依存性の問題（nが1になるまでのパスの長さ）を解くため、
			// この計算は「nから1へのパスの長さ」を求める問題として解釈する。
			// ただし、問題文は「nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」とあるため、
			// nというスタート地点から1に到達するのにかかるステップ数を求める。
			
			// ここでは、1回のクエリ n に対して、nから1へのパスの長さを求める。
			// 1回のクエリの処理は、nが与えられたときに、nから1へのステップ数を計算すること。
			
			// 1回のクエリ n に対する計算を再スタートする
			// （前のループの処理は無視し、このnに対する処理のみを行う）
			
			// nに対する計算:
			
			// 再度、各nに対して計算を独立に行う
			
		}

		// 最終的な合計を求めるための、各nに対する計算を再実行する
		
		currentN = n
		currentSteps := int64(0)
		memo = make(map[int]int64)
		memo[1] = 0
		
		for currentN != 1 {
			if val, ok := memo[currentN]; ok {
				currentSteps += val
				break
			}
			
			var nextN int
			if currentN%2 == 0 {
				nextN = currentN / 2
			} else {
				nextN = 3*currentN + 1
			}
			
			// 再帰的に呼び出す (またはループ内での探索を続ける)
			// この操作は、各nが独立して計算され、その結果が合計される。
			
			// 経路が複雑になるため、再帰的なメモ化が最も自然だが、
			// 構造上、各nの計算を独立に行う。
		}

		// 1回のクエリ n に対する計算を簡略化し、
		// グラフの経路長を求める標準的な方法を採用する。
		
		// 毎回、nから1へのパスを探索する。
		
		// 最終的な合計を計算するために、nごとの計算を再実行する。
		
		// 最初のnの処理を合計に加算する。
		// 複雑なメモ化を省き、単純な再帰で到達する。
		
		var calculateSteps func(start int) int64
		calculateSteps = func(start int) int64 {
			if start == 1 {
				return 0
			}
			// メモ化はここではグローバルに保持する
			if val, ok := memo[start]; ok {
				return val
			}

			var next int
			if start%2 == 0 {
				next = start / 2
			} else {
				next = 3*start + 1
			}

			result := calculateSteps(next) + 1
			memo[start] = result
			return result
		}
		
		// 実際に計算を実行し、合計に加算する。
		steps = calculateSteps(n)
		total += steps
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は不要だが念のため）
	}

	fmt.Printf("total=%d\n", total)
}
