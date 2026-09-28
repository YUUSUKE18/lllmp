package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var totalSteps int64 = 0
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
		n64 := int64(n)

		if n64 == 1 {
			// n が 1 のときの手数は 0
			// このクエリ自体は手数を加算しないが、仕様上はnから1に到達するまでの手数を問うため、
			// 1からスタートする場合は0。もしnがクエリの開始値なら、その値から1への過程を数える。
			// 仕様「n が 1 のときの手数は 0 です。」に従い、n=1の場合は0を計算する。
			totalSteps += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		// 繰り返し操作をシミュレーション
		currentN := n64
		steps := int64(0)

		for currentN != 1 {
			// メモ化チェック
			if val, ok := memo[currentN]; ok {
				steps += val
				currentN = 1 // 1に到達したと仮定してループを抜ける
				break
			}

			// 操作の実行
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++

			// 再帰的なメモ化（ここでは再帰ではなく、探索中のパスを記録する形でメモ化を適用する）
			// この問題は、各クエリ n について「n から 1 に到達するまでの手数」を求めるため、
			// 毎回計算するのではなく、再帰的な構造（またはメモ化再帰）で一括計算するのが効率的だが、
			// ここでは「各クエリ $n$ についての手数」を求めることに焦点を当てる。
			// 仕様は「各クエリ $n$ について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
			// これは、Collatz数列のステップ数を問う問題である。

			// 探索中にメモ化を適用する
			memo[currentN] = steps
		}

		// 最終的な手数を加算
		totalSteps += steps
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalSteps)
}
