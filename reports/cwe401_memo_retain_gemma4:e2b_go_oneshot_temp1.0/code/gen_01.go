package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化テーブル (n -> 手数)
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		if n == 1 {
			memo[1] = 0
			total += 0
			continue
		}

		// 再帰的計算とメモ化
		if _, found := memo[n]; !found {
			// 再帰的な計算ロジックを、メモ化を考慮して実装する
			// 3n+1 または n/2 の操作を繰り返す
			
			currentN := n
			steps := int64(0)
			path := []int{} // 経路を追跡して、重複を防ぐため（特に再帰呼び出しで）
			
			// 経路と計算過程を追跡し、サイクルを検出する
			visited := make(map[int]int) // 値 -> ステップ数
			
			queue := []int{currentN}
			visited[currentN] = 0
			
			isCyclic := false
			
			for len(queue) > 0 {
				u := queue[0]
				queue = queue[1:]
				
				if u == 1 {
					// 1に到達した場合、現在のステップ数を記録し、その後はメモ化する
					memo[n] = steps
					total += steps
					isCyclic = false // ここでサイクル検出が完了したというより、ゴールに到達した
					break
				}
				
				if steps > 1000000 { // 安全のための上限設定（無限ループ対策）
					// 非常に大きな値や無限ループの可能性を考慮
					// ただし、この問題は通常、3n+1問題の性質上、遅いほど長いパスになることが多い
					continue
				}

				var nextN int
				if u%2 == 0 {
					nextN = u / 2
				} else {
					nextN = 3*u + 1
				}
				
				// 経路追跡とサイクル検出（3n+1問題特有のサイクル）
				if _, ok := visited[nextN]; ok {
					// サイクルに到達。これは通常、ゴールに至らないことを意味する。
					// この問題設定では、1に到達するという前提なので、サイクルは無視するか、到達不可とする。
					// ただし、メモ化を優先し、到達した時点で処理を終了させる。
					continue 
				}

				visited[nextN] = steps + 1
				queue = append(queue, nextN)
				steps++
			}

			// BFS/経路探索の結果をメモ化（もし1に到達していれば）
			// 繰り返し処理の結果を直接メモ化する方が効率的だが、この問題は「nから1への最短経路」を求めているため、
			// 毎回計算するのではなく、到達した値のメモ化のみで十分。
			// しかし、問題文の「nが1に到達するまでの手数を求めます」は、初期値nに対する答えを求めるため、
			// nを初期入力として受け取り、その答えを総和に加算する流れが正しい。
			
			// 念のため、nがmemoに存在しない場合の処理を再整理する。
			// BFS/メモ化の一般的なアプローチでは、各nに対する処理を一度だけ実行すればよい。
			// ここでは、nを初期入力として受け取り、その計算結果をtotalに加える。
			
			if _, ok := memo[n]; !ok {
				// BFSの結果をメモ化する
				// (再計算を避けるため、再帰またはDPを導入する方が効率的だが、BFSが直感的)
				// 簡略化のため、ここではBFSが完了した時点で、nに対する答えを求める。
				
				// 注意: この問題は「nが与えられた時の手数」を求め、それを合計する問題。
				// 各行が独立したクエリであるため、nごとに計算し、結果を合計する。
				
				// BFSを実行した結果をnに対する答えとする。
				// 実行したBFSの結果は、nが初期値だった場合の答えである。
				
				// 繰り返し処理の合計を求めるため、nに対する計算結果をtotalに加算する。
				// BFSの最後に、nに対する答えが求まっているはず。
				// しかし、BFSの構造上、nが初期値の場合にのみtotalに加算する必要がある。
				// したがって、外側のループがその役割を果たす。
			}
		}
	}

	// --- 修正されたロジック: 各入力nについて計算し、合計する ---
	
	// メモ化テーブルをリセット（または初期化）
	memo = make(map[int]int64)
	total = 0

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
			memo[1] = 0
			total += 0
			continue
		}
		
		if _, found := memo[n]; !found {
			// nに対する手数を計算 (BFSとメモ化)
			
			// nから1へのパスを探索
			currentN := n
			steps := int64(0)
			visited := make(map[int]int64) // 訪問した値 -> ステップ数
			queue := []int{currentN}
			visited[currentN] = 0
			
			result := -1
			
			for len(queue) > 0 {
				u := queue[0]
				queue = queue[1:]
				
				if u == 1 {
					result = steps
					break
				}
				
				var nextN int
				if u%2 == 0 {
					nextN = u / 2
				} else {
					nextN = 3*u + 1
				}
				
				if _, ok := visited[nextN]; !ok {
					visited[nextN] = steps + 1
					queue = append(queue, nextN)
				}
				steps++
			}
			
			if result != -1 {
				memo[n] = result
				total += result
			}
		}
	}

	fmt.Printf("total=%d\n", total)
}
