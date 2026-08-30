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

		// メモ化された結果を保持するマップ
		memo := make(map[int64]int64)

		var count int64 = 0
		currentN := n

		for currentN != 1 {
			if val, ok := memo[currentN]; ok {
				count += val
				currentN = 1
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			count++
		}

		if currentN == 1 {
			// 1に到達するまでのステップ数を計算し、メモ化
			// 実際には、各クエリ n に対するステップ数を求める必要があるため、
			// ここではDP/メモ化をクエリ全体に適用するのではなく、各クエリが到達するまでの経路を追跡する形にする。

			// 問題の要求は「各クエリ n について、n が 1 に到達するまでの手数を求め、その合計を求める」こと。
			// これは通常のCollatz問題の「到達ステップ数」を求める問題である。

			// 再度、メモ化を適切に行う。
			// nから1への経路の長さを求める。
			
			// 既に計算された値（nから1までの経路）を再帰的または反復的に計算する。
			
			// 必要なのは、各 n についてのステップ数 S(n) の合計。
			
			// メモ化を外側に持たせる。
			// 今回は各入力行 n に対して S(n) を計算する。
		}
	}

	// -----------------------------------------------------------------
	// 再実装: 各入力行 n について、n から 1 へのステップ数を計算し、合計する。
	// -----------------------------------------------------------------

	scanner = bufio.NewScanner(os.Stdin)
	total = 0
	
	// 処理を再実行
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
			total += 0
			continue
		}
		
		// n から 1 へのステップ数を計算する（メモ化を使用）
		// この問題は通常、nが非常に大きい場合に効率的な計算（メモ化）が求められる。
		// nが1に到達するまでのステップ数を求める。
		
		memoStep := make(map[int64]int64)
		memoStep[1] = 0
		
		// BFSやDPで計算する。ただし、今回は各入力に対して個別に計算する。
		
		currentN := n
		steps := int64(0)
		path := []int64{}
		
		// nから1までの経路を追跡して、サイクルを検出またはメモ化する
		
		// 一般的なCollatzのステップ数計算（サイクル検出なし、単調減少を仮定）
		// サイクル検出（現在のパス内での繰り返し）が重要。
		
		tempN := n
		path = []int64{n}
		
		// nが1に到達するまでのステップ数を計算
		for tempN != 1 {
			if _, ok := memoStep[tempN]; ok {
				// メモ化された値が見つかった場合、それを利用して計算を終了する
				steps += memoStep[tempN]
				for i := len(path) - 1; i > 0; i-- {
					path = path[:i]
				}
				// nからtempNまでのステップ数を加算する必要があるが、
				// これはnから1までの単一の経路の長さなので、単純にtempNから1までのステップ数を加算する。
				
				// 再帰的なメモ化が最も簡単だが、ここでは反復で進める。
				// 既にmemoStepに登録されているということは、tempNから1へのパスが既知。
				// nからtempNへのステップ数を加算して、totalに加算する必要がある。
				
				// 簡略化のため、nから1へのパスを順にたどる。
				// サイクル検出を行うため、現在のパスの要素をチェックする。
				
				// 一時的な経路を再計算する方が安全。
				break // サイクル検出が複雑になるため、ここでは単一の計算に絞る。
			}

			// 標準的なCollatzステップ計算
			if tempN%2 == 0 {
				tempN /= 2
			} else {
				tempN = 3*tempN + 1
			}
			steps++
			path = append(path, tempN)
			
			// サイクル検出（経路が既にvisitedされた値に戻ったか）
			// ここでは、もしtempNが既にpath内に存在すれば、それはサイクル。
			// ただし、Collatzの経路は必ず1に収束すると仮定する。
		}
		
		// 経路が1に到達したと仮定して、ステップ数を記録。
		if tempN == 1 {
			total += steps
		} else {
			// 1に到達しなかった場合（理論上は起こらないはずだが）、エラー処理または無視。
			// 問題の制約上、1に収束すると仮定する。
		}
	}

	fmt.Printf("total=%d\n", total)
}
