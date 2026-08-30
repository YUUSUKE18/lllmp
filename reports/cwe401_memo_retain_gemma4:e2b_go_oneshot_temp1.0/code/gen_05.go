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
			// 1に到達するまでの手数は0
			total += 0
			continue
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		// 再帰的/反復的に計算（メモ化再帰/DP）
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

		// 経路に沿ってメモ化を更新
		// 注意: この問題は「nから1に到達するまでの手数」を求め、その合計を求めるものです。
		// 実際の計算では、各nについて「nから1へのパスの長さ」を求める必要があります。
		// 経路を追跡して合計を求める。
		
		// 再計算: メモ化戦略を修正して、経路を追跡する
		
		// 最初のクエリ処理を再構成する。各クエリが独立した計算と見なされる。
		
		// ここでは、nから1へのパスの長さを求める。
		// n=1 の場合は 0。
		// n > 1 の場合、n -> f(n) -> f(f(n)) -> ... -> 1 のステップ数を数える。
		
		// 最初にmemoをリセットし、計算を再実行する。
		// 実際には、入力が1行ずつ与えられるため、各行に対して独立に計算し、その結果を合計する。
		
		// 以下は、nから1へのステップ数を求める一般的な方法（ここでメモ化を再利用する）
		
		// 経路追跡とメモ化を組み合わせる
		
		// 再度計算ロジックをシンプルにする。
		// 1つのnについて、1に到達するまでのステップ数を求める。
		
		tempN := n
		pathSteps := 0
		
		// 現在の経路を追跡してループを制御する
		// サイクル検出（ここでは省略、ただし問題文の操作は基本的に単調減少または増加なので、1に収束すると仮定）
		
		visited := make(map[int]int64) // 経路のメモ化
		visited[n] = 0
		
		current := n
		for current != 1 {
			if val, ok := visited[current]; ok {
				// 以前計算した結果を適用して完了
				pathSteps += val
				break
			}

			// 現在の操作を適用
			if current%2 == 0 {
				next := current / 2
			} else {
				next := 3*current + 1
			}
			
			visited[current] = pathSteps
			pathSteps++
			current = next
		}
		
		// 最後に到達した値が1になることを確認する必要があるが、
		// この問題は「nから1への手数」を求め、その合計を求めるため、
		// 1に到達した時点でのステップ数を加算すればよい。
		
		if current == 1 {
			total += pathSteps
		} else {
			// 1に到達しなかった場合（通常は起こらないが、安全のため）
			// この問題設定（コネルの問題の変種）では必ず1に到達するはず
		}
	}

	fmt.Printf("total=%d\n", total)
}
