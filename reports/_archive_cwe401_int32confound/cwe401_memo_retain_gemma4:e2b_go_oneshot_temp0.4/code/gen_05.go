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
			// n が 1 のときの手数は 0
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var count int64 = 0
		current := n

		for current != 1 {
			if val, ok := memo[current]; ok {
				count += val
				break
			}

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
			memo[n] = count // ここではnをキーに保存するのではなく、現在の値に対する遷移を記録する方が効率的だが、問題の要求は「nが1になるまでの手数」なので、nから1へのパスを追う。
			// 再帰的または動的計画法で考えるのが自然。ここでは、nから1へのパスを追う。
		}

		// 再度、メモ化をより適切に行うために、nから1へのパスを追うロジックを修正する。
		// 実際には、各クエリに対して独立して計算し、その結果を合計する。
		// メモ化は、同じ値が再登場した場合に有効になる。

		// 再計算（メモ化を適用）
		current = n
		steps := int64(0)
		path := []int64{n}
		visited := make(map[int64]int64) // 値 -> 手数

		for current != 1 {
			if current == 0 { // 0は発生しないはずだが念のため
				break
			}
			if current == 1 {
				break
			}

			if steps, ok := visited[current]; ok {
				// 既に計算済みの部分が見つかった場合、そこから計算する
				steps += steps - visited[current] // 既に計算済みの手数を加算
				break
			}

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			steps++
			path = append(path, current)
			visited[current] = steps
		}

		// 最終的な手数を計算する（単純なパス追跡で十分な場合が多い）
		// 実際には、nから1へのパスを追うだけで十分。
		// メモ化は、同じ値が再登場したときにその結果を再利用するために行う。

		// シンプルに、各クエリで計算し、メモ化を適用する。
		// 1からnへのパスを追うのではなく、nから1へのパスを追う。
		
		// 最終的な計算ロジックを再構築する。
		// 各クエリ n について、n -> ... -> 1 へのステップ数を求める。

		// -----------------------------------------------------------------
		// 再度、メモ化を適用したクエリごとの計算を行う
		// -----------------------------------------------------------------
		
		var stepsForN int64 = 0
		currentN := n
		
		// nから1へのパスを追う。
		// サイクル検出やメモ化を導入する。
		
		// サイクル検出のためのセット
		pathSet := make(map[int64]bool)
		pathList := []int64{}
		
		// 追跡開始
		for currentN != 1 {
			if pathSet[currentN] {
				// サイクル検出。この問題では1に到達するはずなので、サイクルは通常発生しない（3n+1問題の性質上、1に収束する）。
				// もしサイクルが発生しても、そのサイクル内のステップ数を考慮する必要がある。
				// しかし、この問題は「1に到達するまでの手数」なので、サイクルは無視できるか、あるいは問題の制約外と考える。
				// 1に収束する問題なので、サイクルは発生しないと仮定する。
				break 
			}
			
			pathSet[currentN] = true
			pathList = append(pathList, currentN)

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
		}
		
		if currentN == 1 {
			stepsForN = int64(len(pathList) - 1) // 最後の要素が1なので、パスの長さは要素数-1
		} else {
			// 1に到達しなかった場合（理論上ありえないが）、エラー処理または無視。
			// 問題の仕様上、必ず1に到達すると仮定する。
			// ここでは、もし1に到達しなかった場合は、そのクエリを無視するか、エラーとして扱うが、
			// 1に収束する問題なので、この分岐は不要と考える。
			// 念のため、1に到達しなかった場合は、計算をスキップする。
			continue
		}

		total += stepsForN
	}

	fmt.Printf("total=%d\n", total)
}
