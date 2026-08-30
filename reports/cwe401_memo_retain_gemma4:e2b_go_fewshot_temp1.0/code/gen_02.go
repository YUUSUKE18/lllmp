package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// 繰り返し計算の結果をメモ化するためのマップ
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行や整数として解釈できない行を無視
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// 状態の計算関数（メモ化あり）
		var calculateMoves func(n int) int64
		calculateMoves = func(n int) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var result int64
			if n%2 == 0 {
				// n が偶数なら n/2
				result = calculateMoves(n / 2)
			} else {
				// n が奇数なら 3n+1
				result = 3*int64(n) + 1
				result += calculateMoves(result)
			}

			memo[n] = result
			return result
		}

		// クエリ n に対する手数を計算
		// 最初に与えられた n から 1 に到達するまでの手数を計算する
		// 注意: 問題文の解釈として、「n が 1 のときの手数は 0」であり、
		// 操作を繰り返す過程で 1 に到達するまでのステップ数を求める。
		// 実際には、n から 1 へのパス上の操作回数を数える必要がある。
		// 質問の意図を「n を操作して 1 になるまでの操作回数」と解釈し、
		// 質問文にある操作を逆向きに考える（または、nから1へ到達する経路上のステップ数）
		// または、単純にnからスタートして1になるまでの操作回数を計算する。
		
		// ここでは、nが与えられたときの操作回数を求める。
		// 1 から n への逆操作を考える（これはフィボナッチ数列の問題の逆操作と同様）
		// しかし、与えられた操作は「nが偶数ならn/2、奇数なら3n+1」であり、これはCollatz予想に関連する操作である。
		// 求めるのは「nからスタートして1になるまでにかかるステップ数」である。

		// 再度、再帰的な計算を「nから1になるまでのステップ数」として定義し直す。
		// この問題は通常、Collatz数列のステップ数を問うものだが、ここでは特殊な操作に従う。
		
		// 目的: n -> ... -> 1 になるまでのステップ数を求める。
		// 最初のnに対して計算を実行する。
		moves := calculateMoves(n)
		total += moves
	}

	fmt.Printf("total=%d\n", total)
}
