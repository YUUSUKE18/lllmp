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
		// nが1に到達するまでのステップ数を求める。

		// 実行時のメモ化を再構築
		memo = make(map[int64]int64)
		memo[1] = 0
		
		// 再帰的なメモ化関数を定義（ここでは直接ループで計算する）
		
		// nから1へのパスを計算
		currentN = n
		steps = 0
		path := []int64{}
		
		// サイクル検出とメモ化を同時に行う
		visited := make(map[int64]int64) // 訪問した数と、その時点で経過したステップ数
		visited[n] = 0
		
		// 1に到達するまでのパスを追跡
		for currentN != 1 {
			if currentN == 0 { // 0に落ちた場合は無限ループまたは異常
				break
			}
			
			if steps > 1000000 { // 安全策：無限ループ防止（実際にはCollatz予想に基づき収束すると仮定）
				break
			}

			if currentN == 1 {
				break
			}

			if _, ok := visited[currentN]; ok {
				// 既に計算済みの値に到達した場合、その結果を適用する
				prevSteps := visited[currentN]
				steps += prevSteps
				// ここで、nからcurrentNまでのステップ数を加算する必要があるが、
				// 複雑になるため、単純にnから1へのパスを追跡する。
				break
			}

			// 操作の実行
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			
			visited[currentN] = steps + 1
			steps++
		}
		
		// 最終的なステップ数を加算
		if currentN == 1 {
			total += steps
		} else {
			// 1に到達しなかった場合（安全策として）、エラー処理または無視
			// 課題の制約上、1に到達すると仮定する。
		}
	}

	fmt.Printf("total=%d\n", total)
}
