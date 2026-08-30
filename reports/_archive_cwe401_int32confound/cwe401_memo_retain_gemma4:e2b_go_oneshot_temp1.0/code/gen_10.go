package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	totalSteps := int64(0)
	memo := make(map[int]int64)

	scanner := bufio.NewScanner(os.Stdin)
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
			// 1 のときの手数は 0
			continue
		}

		// メモ化された値があるかチェック
		if steps, found := memo[n]; found {
			totalSteps += steps
			continue
		}

		// 再帰または反復で計算
		currentN := n
		steps := int64(0)
		path := []int{}

		// 1 に到達するまでのパスを追跡
		for currentN != 1 {
			if currentN == 0 {
				// 0 に到達した場合、通常は無限ループになるが、この問題の操作（3n+1, n/2）では 0 は到達しない。
				// 1 からスタートし、1 に到達するまでの計算なので、0 はここでは想定外。
				// ただし、問題文の操作はCollatzの類題であり、1に収束すると仮定する。
				// 1以外の値に対して操作を続ける。
				break
			}

			if _, found := memo[currentN]; found {
				// 途中でメモ化された値に到達した場合
				steps += memo[currentN]
				break
			}

			path = append(path, currentN)
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 1 に到達したときのステップ数を計算し、パスをメモ化
		if currentN == 1 {
			// 逆順にパスを辿って、各ステップの深さを計算する（Memoizationのより簡単な方法）
			// 実際には、計算過程でメモ化を適用しながら進めるのが最も効率的。

			// 再計算を避けるため、計算過程でmemoを更新する（再帰的メモ化/DPの考え方）
			
			// ここでは、計算過程でmemoを更新するように修正する（反復的なメモ化）
			
			// 再計算を避けるため、再度計算するのではなく、パスを遡って合計を出す方が分かりやすいが、
			// 最初のループで計算した経路をそのまま利用する。
			
			// 最初のループのステップ数 (steps) を利用する。
			// ただし、このステップ数 'steps' は、元の n から 1 に到達するまでのステップ数である。
			memo[n] = steps
			totalSteps += steps
		}
	}

	// 最終的な合計を出力
	fmt.Printf("total=%d\n", totalSteps)
}
