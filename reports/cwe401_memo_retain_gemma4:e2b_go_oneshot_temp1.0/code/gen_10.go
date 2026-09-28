package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// 各行を処理
	for scanner.Scan() {
		line := scanner.Text()
		// 空行や整数として解釈できない行は無視
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue // 整数として解釈できない場合は無視
		}

		if n == 1 {
			// n が 1 のときの手数は 0
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)
		memo[1] = 0

		// 繰り返し計算とメモ化
		currentN := n
		steps := int64(0)
		path := []int64{n}

		for currentN != 1 {
			if steps > 1000000 { // 無限ループ防止のための安全装置（実際には1に到達すれば終了するはずだが念のため）
				break
			}
			var nextN int64
			if currentN%2 == 0 {
				nextN = currentN / 2
			} else {
				nextN = 3*currentN + 1
			}

			steps++
			path = append(path, nextN)

			if nextN == 1 {
				break
			}
			currentN = nextN
		}

		// 途中経過をメモ化
		// スタックを逆順に処理して、到達経路をメモ化する
		// (この問題は、単一のクエリに対する最小ステップ数を求める問題なので、
		// nから1に到達するまでのパスを辿ることで、そのパスの長さが答えになる)
		// しかし、問題文は「n が 1 に到達するまでの手数を求めます」であり、
		// これは通常のコラッツ予想の数列のステップ数を求める問題であるため、
		// n から 1 へのパスの長さを数えるべきである。
		// 繰り返し操作を適用するたびにステップ数を加算する。

		// 再計算: 繰り返し操作を適用するたびにステップ数を加算する
		// n からスタートし、1に到達するまでの操作回数を数える。
		steps = 0
		currentN = n
		for currentN != 1 {
			if currentN == 0 { // 0に落ちた場合は無限ループ（ただしこの問題では1に到達すればOK）
				break
			}
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		total += int64(steps)
	}

	// 結果を出力
	fmt.Printf("total=%d\n", total)
}
