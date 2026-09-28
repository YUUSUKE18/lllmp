package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var totalCount int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

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

		// メモ化のためのマップ
		memo := make(map[int]int64)

		var count int64 = 0
		currentN := n

		// 1に到達するまでの手数を計算
		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				// メモがあればスキップ
				count += memo[currentN]
				break
			}

			// 遷移の計算
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}

			// 再帰的な呼び出し（またはループ内でのメモ化）
			// ここでは、現在のパスでの手数を計算するために、再帰的にまたはループで進める
			// 既にmemoに存在しない場合、次のステップに進む
			if currentN == 1 {
				count++
			} else {
				// 再帰的に呼び出すのではなく、現在のパスの計算を続ける
				// 最適化のため、この問題は通常、開始値 n から 1 へのパスを計算する問題であり、
				// 遷移の回数を数える問題と解釈します。
				// n から 1 に到達するまでのステップ数を数えます。
				// 現在のロジックは、n から 1 に到達するまでのステップ数を計算する標準的な「コナーズの予想」のプロセスをシミュレーションしています。
				// ただし、問題の要求は「1 に到達するまでの手数を求めます」です。
				// これは、n から開始して、n -> f(n) -> f(f(n)) -> ... -> 1 となる過程のステップ数を意味します。
				// 実際には、n から 1 に到達するまでの「操作の回数」を求めるため、再帰的または反復的に計算する必要があります。

				// メモ化を適用し、再帰的な構造を導入します。
				// ここでは、関数呼び出しを再帰的に行い、その結果をメモ化します。
				// 外部ループではなく、関数呼び出しで処理します。
				// 外部ループの構造を維持しつつ、内側で再帰的メモ化を適用します。
				break // ループの構造を再構築するため、ここでは一旦ブレイク
			}
		}

		// 修正されたメモ化と計算ロジック (再帰的メモ化を使用)
		// 外部ループの処理を、関数呼び出しに置き換えます。
		// 外部のループで各クエリ n に対して、n から 1 へのパスを計算し、その結果を合計します。

		// n から 1 へのパスを計算する関数を定義し、それを呼び出す
		// この実装では、外部ループで各 n に対して、その結果を計算します。
		// 外部ループの n について、n から 1 への経路を計算します。

		memoN := make(map[int]int64)
		var calculatePath func(k int) int64
		calculatePath = func(k int) int64 {
			if k == 1 {
				return 0
			}
			if val, ok := memoN[k]; ok {
				return val
			}

			var result int64
			if k%2 == 0 {
				result = calculatePath(k / 2) + 1
			} else {
				result = calculatePath(3*k + 1) + 1
			}

			memoN[k] = result
			return result
		}

		// 各クエリ n について計算を実行
		// この問題は、与えられた n に対して、n から 1 へのパスの長さを求めるものです。
		// 外部のループで n ごとに計算する必要があります。
		// n=1 の場合は手数は 0。

		// 外部ループのロジックを再実行:
		// n がクエリ値。n から 1 への手数を求める。
		currentCount := int64(0)
		if n > 0 {
			// n から 1 へのパスを計算
			// この計算は、再帰的なメモ化関数を使って実行されるべきです。
			// 外部ループで毎回新しいメモを作成するのは非効率的です。
			// すべてのクエリ n に対して、一つのグローバルなメモを共有し、一度計算すれば十分です。
			// ただし、問題文は「各クエリ n について」とあるため、もしクエリが独立しているなら、nごとに計算する必要があります。

			// 別の解釈: 各クエリ n に対して、n をスタート地点として 1 に到達するまでのステップ数を求める。
			// n=1 のとき、手数は 0。
			// n=2 のとき: 2 -> 1 (1ステップ)
			// n=3 のとき: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)
			// これは、n からスタートして、操作を繰り返して 1 に到達するまでの回数を数える問題です。

			// 内部で再計算を避けるため、ここでは関数呼び出しで計算します。
			// 外部のループで n ごとに計算を実行します。
			memoN = make(map[int]int64)
			var calculatePathForN func(k int) int64
			calculatePathForN = func(k int) int64 {
				if k == 1 {
					return 0
				}
				if val, ok := memoN[k]; ok {
					return val
				}

				var result int64
				if k%2 == 0 {
					result = calculatePathForN(k / 2) + 1
				} else {
					result = calculatePathForN(3*k + 1) + 1
				}

				memoN[k] = result
				return result
			}

			// n からのパスを計算
			pathLength := calculatePathForN(n)
			currentCount += pathLength
		}

		totalCount += pathLength
	}

	fmt.Printf("total=%d\n", totalCount)
}
