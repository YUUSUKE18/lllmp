package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化のためのマップ
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行を無視
		if line == "" {
			continue
		}

		// 整数として解釈を試みる
		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// nが1以上の整数であるか確認（仕様上は1以上の整数が並ぶと仮定）
		if n < 1 {
			continue
		}

		// 再帰的または反復的に操作をシミュレーションし、メモ化を利用する
		currentN := n
		steps := int64(0)

		// 1に到達するまでの手数を計算
		for currentN != 1 {
			if val, ok := memo[currentN]; ok {
				steps += val
				currentN = 1 // 1に到達したと仮定してループを抜ける
				break
			}

			// 操作の適用
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 1に到達したときのステップ数をメモ化する（これは、nから1に到達するまでの手数を求める問題なので、
		// 実際にはnが1に到達するまでの操作回数を数える必要がある。
		// ここでは、nが1に到達するまでの操作回数を計算する。
		// 1に到達するまでの操作回数を求めるため、再帰的な構造をメモ化に適用する。
		// 実際には、nが1に到達するまでの操作回数を求めるため、
		// n -> f(n) -> f(f(n)) ... -> 1 となる過程のステップ数を数える。

		// 再計算：nから1に到達するまでの手数を求める
		// 1に到達するまでの手数を求めるため、memo[n]をnから1への手数とする。

		// 再帰的なメモ化（より正確な解法）
		var calculateSteps func(k int) int64
		calculateSteps = func(k int) int64 {
			if k == 1 {
				return 0
			}
			if val, ok := memo[k]; ok {
				return val
			}

			var result int64
			if k%2 == 0 {
				// nが偶数なら n/2
				result = calculateSteps(k / 2) + 1
			} else {
				// nが奇数なら 3n+1
				result = calculateSteps(3*k + 1) + 1
			}

			memo[k] = result
			return result
		}

		// 最初のクエリ n について計算を実行
		steps = calculateSteps(n)
		total += steps
	}

	// 結果の出力
	fmt.Printf("total=%d\n", total)
}
