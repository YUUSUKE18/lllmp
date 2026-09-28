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
		var n int
		_, err := fmt.Sscanf(scanner.Text(), "%d", &n)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int)
		memo[1] = 0

		currentN := n
		steps := 0

		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				steps = memo[currentN]
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
		// ここでは、元のnから1に到達するまでのステップ数を計算した結果をメモ化する
		// ただし、問題文の意図は「nが1になるまでの操作の回数」を求めることなので、
		// 実際には再帰または動的計画法で計算し、その結果をメモ化するのが一般的です。
		// ここでは、クエリごとに計算し、その結果を合計します。
		// メモ化は、同じ中間値が何度も現れる場合に役立ちます。

		// 再計算を避けるため、ここでは直接計算します。
		// 厳密には、nが非常に大きい場合、この計算自体が問題になるため、
		// 実際にはnが再帰的な数列（コネルの問題など）のステップ数を求める問題として解釈し、
		// そのステップ数を求める計算を効率化します。

		// 再帰的な計算とメモ化を組み合わせる
		// 以下のロジックは、nが1になるまでのステップ数を求める標準的な方法に基づきます。
		// 実際には、nが非常に大きい場合の計算効率を上げるため、
		// 遷移を逆算するか、または再帰的なメモ化を適用します。

		// ここでは、単純な繰り返し計算とメモ化を適用します。
		// 既に計算済みの値があればそれを利用します。
		
		// 簡略化のため、再帰的なメモ化を導入します。
		// 外部のマップを使い、計算の過程でメモ化を行います。
		
		// 外部でメモ化を管理する構造体や関数を導入するのが理想的ですが、
		// 1行出力の制約とシンプルな構造を保つため、ここではループ内でメモ化を試みます。
		
		// 繰り返し計算とメモ化の適用（再帰的な構造を模倣）
		
		// 外部でメモを管理する
		memoMap := make(map[int]int)
		memoMap[1] = 0
		
		var calculateSteps func(k int) int
		calculateSteps = func(k int) int {
			if k == 1 {
				return 0
			}
			if val, ok := memoMap[k]; ok {
				return val
			}

			var result int
			if k%2 == 0 {
				result = calculateSteps(k / 2) + 1
			} else {
				result = calculateSteps(3*k + 1) + 1
			}
			memoMap[k] = result
			return result
		}
		
		// 最初のクエリで計算を実行
		steps = calculateSteps(n)
		total += int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}
