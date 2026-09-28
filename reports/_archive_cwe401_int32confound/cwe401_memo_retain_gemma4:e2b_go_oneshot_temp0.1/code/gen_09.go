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
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)
		memo[1] = 0

		currentN := n
		steps := int64(0)

		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				steps += memo[currentN]
				currentN = 1 // 1に到達したと仮定してループを抜ける
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 実際には、再帰的なメモ化（またはDP）で計算した結果を格納する方が効率的だが、
		// ここでは与えられた操作を直接シミュレーションし、メモ化を適用する。
		// 課題の要求は「1に到達するまでの手数を求める」ことなので、
		// 毎回シミュレーションするのではなく、再帰的なメモ化（またはDP）で全体を計算するべき。

		// 再度、メモ化をより適切に適用する形で計算を修正する。
		// 課題の要求は「各クエリ n について、n が 1 のときの手数は 0 です。n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
		// これは、nから1に到達するまでのステップ数を求める問題であり、通常は再帰的なメモ化（またはDP）で解かれる。

		// 既存のシミュレーションロジックを、メモ化を組み込んだDP的なアプローチに置き換える。
		// 外部ループで個々のnを処理するのではなく、全てのnに対してDPテーブルを構築する方が効率的だが、
		// 標準入力の形式に従い、各行に対して計算を行う。

		// 簡略化のため、各nについて、再帰的なメモ化を適用してステップ数を計算する。
		// 外部ループで処理を続けるため、ここでは再帰関数を定義し、それを呼び出す。

		// 既存のロジックを破棄し、再帰的なメモ化を適用した計算を再実行する。
		// 外部ループで処理を続けるため、ここでは再帰的なメモ化を適用した計算を格納する。
		// 課題の要求は「すべてのクエリの手数の合計を求めます」なので、各クエリで計算する。

		// -----------------------------------------------------------------
		// 再帰的なメモ化による計算
		// -----------------------------------------------------------------

		var calculateSteps func(k int64) int64
		memoRec := make(map[int64]int64)
		memoRec[1] = 0

		calculateSteps = func(k int64) int64 {
			if k == 1 {
				return 0
			}
			if val, ok := memoRec[k]; ok {
				return val
			}

			var result int64
			if k%2 == 0 {
				result = calculateSteps(k / 2)
			} else {
				result = 3*k + 1
				result += calculateSteps(result)
			}

			memoRec[k] = result
			return result
		}

		// 最初のクエリnに対する手数を計算
		steps := calculateSteps(n)
		total += steps
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	fmt.Printf("total=%d\n", total)
}
