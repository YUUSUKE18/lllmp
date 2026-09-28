package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化テーブル
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
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		// 再帰的計算とメモ化
		var steps int64
		if n%2 == 0 {
			// nが偶数なら n/2
			steps = 1 + memo[n/2]
		} else {
			// nが奇数なら 3n+1
			steps = 1 + memo[3*n+1]
		}

		// 実際には、この問題は「nが1になるまでの手数」を求める問題であり、
		// 置き換え操作の逆操作（または直接的な計算）が必要です。
		// 問題文の操作は「nが1になるまでの手数を求める」というものであり、
		// 置き換え操作そのものの手数を求めるのではなく、
		// 置き換え操作を繰り返した結果、1に到達するまでのステップ数を求める、という解釈が自然です。
		// ただし、与えられた操作はCollatz予想に関連する操作です。
		// ここでは、与えられた操作を繰り返して1に到達するまでのステップ数を計算します。

		currentN := n
		count := int64(0)
		path := []int{} // 経路を記録してメモ化に利用する

		// 経路を記録しながら計算し、サイクルを検出してメモ化する
		visited := make(map[int]int64)
		
		for currentN != 1 {
			if currentN == 0 { // 0は発生しないはずだが念のため
				break
			}
			
			if val, ok := visited[currentN]; ok {
				// サイクル検出
				// サイクル内のステップ数を計算し、それを使って総ステップ数を計算する
				cycleStartStep := visited[currentN]
				cycleLength := count - cycleStartStep
				
				// サイクルを抜けた後のステップ数を計算
				remainingSteps := count - cycleStartStep
				
				// サイクルを繰り返す
				// この問題の要求は「1に到達するまでの手数」なので、サイクルに陥った場合は、
				// サイクルを抜けた後の計算を再評価する必要があります。
				// シンプルに、サイクルに到達した時点で、そのサイクルが1に到達するかどうかをチェックします。
				
				// Collatz予想に基づくと、すべての数は1に到達すると仮定されます。
				// サイクルに到達した時点で、そのサイクル内のステップ数を加算します。
				
				// ここでは、単純化のため、サイクル検出をせず、再帰的なメモ化に頼る方が安全です。
				// サイクル検出は、より複雑な最適化（サイクル内のステップ数の計算）が必要になるため、
				// 今回は単純な再帰メモ化で対応します。
				break 
			}
			
			visited[currentN] = count
			
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			count++
		}
		
		// 再帰的なメモ化を再試行（より標準的な方法）
		// サイクル検出を無視し、単純な再帰メモ化で進める
		
		var calculateSteps func(n int) int64
		calculateSteps = func(n int) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var result int64
			if n%2 == 0 {
				result = 1 + calculateSteps(n / 2)
			} else {
				result = 1 + calculateSteps(3*n+1)
			}
			
			memo[n] = result
			return result
		}
		
		steps := calculateSteps(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
