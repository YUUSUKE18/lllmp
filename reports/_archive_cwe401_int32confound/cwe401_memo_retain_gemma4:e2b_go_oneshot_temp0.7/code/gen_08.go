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
		steps := 0

		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				steps = memo[currentN] + 1
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 途中計算でメモ化を更新
		// 逆順に計算してメモ化するのが効率的だが、ここでは単純に再帰的な構造を模倣して、
		// 実際には再帰またはループで計算した結果をメモ化する。
		// BFSやDP的なアプローチで計算した結果をメモ化する方が、
		// 途中で同じ値に到達した際に再計算を避けるため、
		// 最初に計算した値が正しい手数となる。

		// 再計算を避けるため、今回は直接計算した手順をメモ化する。
		// ただし、この問題は「1に到達するまでの手数」を求めるため、
		// 各クエリごとに計算し、その過程で発生する重複を避けるのがメモ化の目的。

		// 再度、クエリ n の手数を求める計算を、メモ化を利用して行う。
		// ここでは、nが1になるまでのパスを辿る。
		
		// メモ化の構造を修正し、関数呼び出しのように動作させる。
		// nが1になるまでの手数を求める関数を定義し、それをメモ化する。
		
		// 関数呼び出しで再定義し、メモ化を適用する。
		// この問題設定では、各クエリが独立しているため、
		// 外部のメモ化マップを保持しつつ、各クエリで再帰的に計算する形で実装する。
		
		// 既にループで計算した steps を使用する。
		// 最初のループで求めた steps を total に加算する。
		total += int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}
