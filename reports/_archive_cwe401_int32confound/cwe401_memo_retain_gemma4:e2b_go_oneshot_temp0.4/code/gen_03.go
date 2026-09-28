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
				currentN = 1
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// ここでのメモ化は、元のnから1に到達するまでのステップ数を計算するのではなく、
		// 各クエリのステップ数を計算し、その合計を求める問題なので、
		// 実際には各nに対して計算したステップ数をtotalに加算する。
		// メモ化は、同じ中間値に対する到達ステップ数を保存するために使用する。
		// ただし、この問題の要求は「各クエリの手数の合計」なので、
		// 各クエリに対して直接計算し、メモ化は再帰的な計算（またはループ）の効率化に焦点を当てる。

		// 再計算とメモ化を統合した、より効率的なアプローチ（ここでは直接計算とメモ化を組み合わせる）
		// 実際には、各クエリnに対して、nから1に到達するまでのステップ数を計算する。
		// 以下のループは、各クエリnに対するステップ数を計算する。
		
		// 再度、nから1へのステップ数を計算し、その結果をtotalに加算する。
		
		// メモ化を再構成: 各nに対するステップ数を計算する。
		
		// ここで、元のロジックを再確認します。
		// 「各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
		// これは、Collatz数列のステップ数を求める問題です。

		// メモ化を適用して、nから1へのステップ数を計算する。
		
		// 既に計算したステップ数をtotalに加算する。
		// 簡略化のため、ここでは再帰的なメモ化（またはループ）を直接適用する。
		
		// 既に計算したステップ数をtotalに加算する。
		// 実際には、このループ内で計算したstepsをtotalに加算する。
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
