package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 標準入力から全ての行を読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// 読み込んだ行を処理する
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var calculateSteps func(n int64) int64
		calculateSteps = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if result, ok := memo[n]; ok {
				return result
			}

			var steps int64
			if n%2 == 0 {
				// n が偶数なら n/2
				steps = calculateSteps(n / 2) + 1
			} else {
				// n が奇数なら 3n+1
				steps = calculateSteps(3*n + 1) + 1
			}

			memo[n] = steps
			return steps
		}

		// 各クエリに対する手数を計算し、合計に加算する
		// 注意: 課題の記述「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」は、
		// 典型的なコナーの予想（3n+1問題）の手数計算を指しており、これは通常、nから1に到達するまでのステップ数を問うものです。
		// ここでは、nが与えられたとき、nが1になるまでのステップ数を計算します。

		// 課題の意図を再解釈:
		// nが与えられたとき、nが1になるまでの操作の回数を求める。
		// n=1 のときは 0 回。
		// n > 1 のとき:
		// n が偶数なら n/2。
		// n が奇数なら 3n+1。
		// この操作を繰り返して 1 に到達するまでのステップ数を求める。

		// この問題は、与えられた n から 1 に到達するまでのステップ数を求める問題（3n+1問題）を指していると解釈します。
		// ただし、問題文の操作が「nが偶数なら n/2、奇数なら 3n+1」というルールであり、これは標準的な3n+1問題の操作とは異なります。
		// 3n+1問題では、nが奇数のとき 3n+1 を計算し、nが偶数のとき n/2 を計算します。
		// ここでは、与えられたルールに従って、nから1への到達ステップ数を計算します。

		// 再度、メモ化された関数を呼び出す（この関数は、与えられたnから1へのステップ数を計算する）
		steps := calculateSteps(int64(n))
		total += steps
	}

	// 結果を出力
	fmt.Printf("total=%d\n", total)
}
