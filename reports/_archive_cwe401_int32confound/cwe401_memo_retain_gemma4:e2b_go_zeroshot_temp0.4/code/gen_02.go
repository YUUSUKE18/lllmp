package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var total int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

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

		// メモ化された結果を保持するマップ
		memo := make(map[int]int64)

		// 繰り返し計算（メモ化付き）
		var count int64 = 0
		currentN := n

		for currentN != 1 {
			// メモ化チェック
			if val, ok := memo[currentN]; ok {
				count += val
				break
			}

			// 操作の適用
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}

			// 再帰的な呼び出し（またはループ内でのメモ化）を考慮し、ここでは直接ループを続ける
			// 実際には、この問題は「1に到達するまでの手数」を求めるため、
			// 各クエリ n について、nから1に到達するパスの長さを求める必要があります。
			// 提示された操作はコネルの予想（3n+1問題）に関連しており、
			// 1に到達するまでの手数を求める問題（Collatz conjectureの経路長）を意図していると解釈します。

			// 1に到達するまでの手数を求めるため、現在のステップ数をカウントし続ける
			count++
		}

		// 1に到達したときのステップ数をメモ化
		// ここで、nから1に到達するまでのステップ数を計算し、それをメモ化します。
		// ただし、問題文の「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」は、
		// 通常、その操作を繰り返した「回数」を求めることを意味します。

		// 再度、メモ化戦略を修正します。
		// 各クエリ n について、nから1に到達するまでの操作回数を計算します。
		// 複数のクエリに対して共通のメモ化を適用します。

		// 最終的な計算ロジックを再構築します。
		// 各クエリ n について、nから1に到達するまでの操作回数を計算します。
		// この計算は、クエリごとに独立して行われますが、同じ中間値が出現すればメモ化します。

		// -------------------------------------------------------------------
		// 修正後の計算ロジック（メモ化を適用）
		// -------------------------------------------------------------------

		// この部分の計算は、クエリ n ごとに独立して行われます。
		// 外部のループで処理を続けるため、ここでは結果を合計します。

		// 処理を再開します。
	}

	// 外部ループで処理を再実行し、合計を計算する。
	// 最初のループでは合計を計算していなかったため、再実行が必要です。
	// 正しい実装は、入力から読み込んだ各 n に対して、その n から 1 への経路長を計算し、合計を求めることです。

	// -------------------------------------------------------------------
	// 正しい実装（再構成）
	// -------------------------------------------------------------------

	// 読み込みを再実行し、合計を計算します。
	scanner = bufio.NewScanner(os.Stdin)
	var finalTotal int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// n=1 の場合は手数は 0
			finalTotal += 0
			continue
		}

		// メモ化テーブル
		memo := make(map[int]int64)

		// n から 1 への経路長を計算
		currentN := n
		steps := int64(0)

		// 経路を追跡し、ループを抜ける前にメモ化を適用する
		path := []int{}
		
		// 経路を追跡し、循環を検出するために、訪問した数を記録する
		visited := make(map[int]int)
		
		for currentN != 1 {
			if currentN == 0 {
				// 0 に到達した場合（これは通常起こらないが、念のため）
				break
			}
			
			// 循環検出
			if _, ok := visited[currentN]; ok {
				// 循環に陥った場合、この経路は1に到達しない（または無限ループ）
				// 問題の文脈では、1に到達すると仮定されるため、これは通常発生しない。
				// もし発生した場合、このクエリは無視するか、エラーとするが、ここでは続行する。
				break
			}
			visited[currentN] = int(steps)

			// メモ化チェック
			if val, ok := memo[currentN]; ok {
				steps += val
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

		// 1に到達したか、またはメモ化されたかを確認
		if currentN == 1 {
			// 1に到達したときのステップ数をメモ化
			memo[n] = steps
			finalTotal += steps
		} else if val, ok := memo[n]; ok {
			// 既にメモ化されていた場合
			finalTotal += val
		} else {
			// 1に到達しなかった（循環など）
			// 問題の制約から、これは発生しないと仮定する。
		}
	}

	// 最終結果の出力
	fmt.Printf("total=%d\n", finalTotal)
}
