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
			continue
		}

		// メモ化のためのマップ（ここでは簡略化のため、再帰/DPとして直接計算するが、
		// 実際には重複を避けるためにマップを使うべきだが、ここでは仕様に従い再帰的な計算を高速化する方針を採用する）
		// 制約上、計算結果が64bitに収まるため、再帰呼び出しとメモ化を組み合わせる。

		// 実行する関数
		count := countSteps(n)
		total += int64(count)
	}

	fmt.Printf("total=%d\n", total)
}

// countSteps は n から 1 に到達するまでの手数を計算する関数。
// メモ化のためにマップを使用する。
var memo = make(map[int]int)

func countSteps(n int) int {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	var steps int
	if n%2 == 0 {
		// n が偶数なら n/2
		steps = countSteps(n / 2)
	} else {
		// n が奇数なら 3n+1
		steps = 3*n + 1
	}

	// 注意: 課題の記述「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」
	// これは「操作の回数」を求める問題であり、nから1に到達するまでの過程のステップ数を問うていると解釈される。
	// ここでは、nを操作した結果を次の状態とし、その過程の総ステップ数を数える。
	// もし、nの操作を繰り返して1に到達するまでの操作回数を求めるなら、以下のロジックとなる。

	// 再解釈: nを操作するたびに1ステップとしてカウントし、1に到達するまでの総ステップ数を求める。
	// 操作:
	// n is even -> n = n/2
	// n is odd -> n = 3n+1
	// 1に到達するまでのステップ数を求める。

	// 最初の解釈（Aの操作回数）：
	// if n%2 == 0 {
	// 	return 1 + countSteps(n/2)
	// } else {
	// 	return 1 + countSteps(3*n+1)
	// }

	// しかし、例題が「手数を求めます」とあるため、通常は数列A0009조（コナーの問題）のように、操作回数を問う問題。
	// 最初の例題が「1に到達するまでの手数を求めます」なので、Aの解釈を採用する。
	// ただし、nが偶数か奇数で分岐するだけであり、その操作自体が1ステップである。

	// 再帰的に、1に到達するまでのステップ数を計算する（nが1で終了）
	if n%2 == 0 {
		result := 1 + countSteps(n/2)
		memo[n] = result
		return result
	} else {
		result := 1 + countSteps(3*n+1)
		memo[n] = result
		return result
	}
}

// 実行時の修正（memo化を適用した結果、上記再帰が正しい）
// 最終的に、上記コードを修正して提供する。
// 課題の指示に従い、再帰的なメモ化を導入する。
