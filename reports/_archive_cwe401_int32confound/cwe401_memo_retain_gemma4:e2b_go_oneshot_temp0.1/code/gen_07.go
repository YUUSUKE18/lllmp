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

		var n int64
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
		memo := make(map[int64]int64)
		memo[1] = 0

		currentN := n
		steps := int64(0)

		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				steps += memo[currentN]
				currentN = 1 // 1に到達したと仮定してループを抜ける
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 実際には、再帰的なメモ化（または動的計画法）がより適切だが、
		// ここでは与えられた操作を直接シミュレーションし、メモ化を適用する。
		// 課題の意図を再解釈し、各クエリ n について、n から 1 に到達するまでの手数を求める。
		// 繰り返し操作を「1に到達するまでの手数」と解釈する。

		// 再度、メモ化をより適切に適用する（DP/メモ化再帰の考え方）
		// 課題の操作は、Collatz予想に関連する操作である。
		// n から 1 への最短経路を求める。

		// 実行時のメモ化を再構築
		memo = make(map[int64]int64)
		memo[1] = 0
		
		// 再帰的なメモ化関数を定義（ここでは直接ループで計算する）
		
		// n から 1 への手数を計算
		currentN = n
		steps = 0
		path := []int64{}
		
		// サイクル検出とメモ化を同時に行う
		visited := make(map[int64]int64)
		visited[n] = 0
		
		queue := []int64{n}
		
		// BFSで最短経路を求める（ただし、操作は一方向のみなので、これは単なる経路探索）
		// 課題は「操作を繰り返し、1に到達するまでの手数」なので、これは単一の経路を意味する。
		
		// 課題の操作を「1に到達するまでの手数」として解釈し、メモ化を適用する。
		// n -> f(n) -> f(f(n)) -> ... -> 1
		
		// 1回のクエリ n に対する手数を計算
		
		currentN = n
		steps = 0
		
		// サイクル検出とメモ化を組み合わせる
		history := make(map[int64]int64)
		history[1] = 0
		
		// 経路を追跡しながら計算
		for currentN != 1 {
			if _, ok := history[currentN]; ok {
				// 既に計算済みの値に到達した場合、その手数を加算して終了
				steps += history[currentN]
				break
			}
			
			// サイクル検出（同じ値に戻る）
			if _, ok := history[currentN]; ok {
				// サイクルに陥った場合、これは通常Collatz問題では発生しないが、
				// ここでは「1に到達するまでの手数」なので、サイクルは無視するか、
				// サイクル内の手数を考慮する必要がある。
				// 課題の文脈から、サイクルは「1に到達する」という目標を妨げるため、
				// サイクルが発生した場合は、その経路が無限になることを意味する。
				// ただし、問題文は「1に到達するまでの手数」を求めているため、
				// サイクルが発生した場合は、その経路が1に到達しないと見なす。
				// ここでは、サイクルが発生した場合は、その経路を計算しない（またはエラーとする）と仮定する。
				// 実際には、Collatz問題では必ず1に収束すると仮定される。
				// 念のため、サイクル検出はスキップし、単純に計算を続ける。
			}
			
			// 次のステップへ
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
			
			// メモ化
			history[currentN] = steps
		}
		
		// 1に到達したときのステップ数を加算
		total += int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}
