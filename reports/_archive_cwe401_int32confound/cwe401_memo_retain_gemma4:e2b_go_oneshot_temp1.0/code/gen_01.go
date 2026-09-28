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
			continue // 整数として解釈できない行は無視
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
			if result, ok := memo[currentN]; ok {
				steps = result + steps
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 計算結果をメモ化
		// 注意: この問題は「nが1に到達するまでの手数」を求める問題であり、
		// 繰り返し操作の過程でメモ化を適用する必要があります。
		// ただし、与えられた仕様「各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
		// の解釈として、各クエリに対して個別に計算し、その結果を合計するというのが最も自然です。
		// 「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください」は、
		// 複数のクエリが同じ値を生成する可能性があることを示唆しています。
		// しかし、標準的な「Collatz問題」の文脈では、通常、一つの数から1へのパスの長さ（手数）を求めます。
		// ここでは、与えられたクエリnに対して、nから1へのパス長を計算し、その合計を求めます。
		// もし「同じ整数が繰り返し現れる」が「同じクエリnが与えられた」ことを意味するなら、上記ループで十分です。
		// より高度なメモ化（DP/Memoization）は、もし複数のクエリが同じ中間値を生成する場合に適用されます。

		// 今回は、各クエリ n に対する「nから1へのパスの長さ」を求めます。
		// ここで求められているのは「操作を繰り返して1に到達するまでの手数」なので、
		// 処理を再設計します。

		// --- 再計算：nから1へのパス長を求める ---
		
		// 繰り返し操作のステップ数を計算する関数（メモ化付き）
		var calculateSteps func(start int) int64
		calculateSteps = func(start int) int64 {
			if start == 1 {
				return 0
			}
			if result, ok := memo[start]; ok {
				return result
			}

			var steps int64 = 0
			currentN := start
			path := []int{} // 経路を追跡して、ループを防ぐために一時的に使用（もし循環が発生する場合）

			// ここでは、厳密にCollatzの操作（n=3n+1, n=n/2）を1に到達するまでのステップ数と解釈します。
			// 循環（例: 4 -> 2 -> 1）が発生しないことを前提とします。
			
			// 単純なステップ計算（メモ化は再帰呼び出しで適用）
			// 循環チェックを厳密に行うため、今回は直接ループで計算します。
			
			tempN := start
			history := []int{start}
			steps = 0
			
			for tempN != 1 {
				if tempN%2 == 0 {
					tempN /= 2
				} else {
					tempN = 3*tempN + 1
				}
				steps++
				history = append(history, tempN)
			}
			
			// 循環がないと仮定し、結果をメモ化
			memo[start] = steps
			return steps
		}

		// 再計算（クエリ n ごとに実行）
		steps := calculateSteps(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
