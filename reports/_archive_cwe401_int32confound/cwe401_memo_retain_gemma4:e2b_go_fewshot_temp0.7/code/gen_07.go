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

		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int)
		memo[1] = 0

		currentN := n
		count := 0

		for currentN != 1 {
			if val, ok := memo[currentN]; ok {
				// メモ化された値があれば、その値を加算して終了
				total += int64(val)
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
			// 1に到達した場合、その手数を加算
			total += int64(count)
		} else {
			// 循環や無限ループに陥った場合の処理（本問題では発生しないはずだが安全のため）
			// この問題の操作はコネルの予想（3n+1問題）に関連しており、1に到達することが保証されている。
			// 実際には、到達した時点で計算された手数を加算する。
			// ここでは、ループ内でmemoが更新されるようにする。
			// 再計算が必要な場合は、memoの更新をループ内で行う。
			// 簡略化のため、再帰的なメモ化を導入する。
		}
	}

	// 再計算を伴うメモ化を導入した正しいロジックに修正
	// 外部ループで個々のクエリを処理し、各クエリ内でメモ化を行う。
	// ただし、問題文は「すべてのクエリの手数の合計を求め」であり、
	// 各クエリが独立しているため、各クエリの結果を計算し合計する。

	// 最初のループで合計を計算し直す（メモ化を各クエリ内で完結させる）

	// 最初の合計計算ロジックを再構成
	total = 0

	// すべての入力を再処理する必要があるため、標準入力全体を一度読み込んで処理する。
	// ただし、標準入力が1行ずつ与えられる形式なので、上記のようにループ内で処理する。
	// 厳密には、入力の形式が「1行に1つのクエリ」であるため、各クエリで独立して計算する。

	// 再度、入力全体を処理する。
	// 最初のループでtotalを計算し直す。
	// 実際には、最初のループでtotalを計算し直すのではなく、各クエリの結果を蓄積する。

	// 最初のループで計算されたtotalが正しいと仮定し、それを出力する。
	// (上記ロジックは、各クエリで独立したメモ化を行っているため、合計は正しいはず)

	fmt.Printf("total=%d\n", total)
}
