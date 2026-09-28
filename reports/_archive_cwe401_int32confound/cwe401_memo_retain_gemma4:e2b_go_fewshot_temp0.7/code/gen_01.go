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

		var count int64 = 0
		currentN := n

		for currentN != 1 {
			if count > 1000000 { // 安全策として無限ループを防ぐための制限（問題の制約上不要かもしれないが、念のため）
				break
			}
			if _, ok := memo[currentN]; ok {
				// メモがあればそこで計算を終了
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			count++
		}

		// 1に到達するまでの手数を記録（メモ化）
		// 経路を遡って、元のnからの手数を計算するのではなく、
		// 実際に実行したステップ数をカウントする。

		// ここで、nから1に到達するまでのステップ数を再計算し、メモ化する。
		// 実際には、nが与えられたときの操作回数を求める。

		// 再度、メモ化戦略を適用する。
		// 最初に計算したnからの手数をmemoに格納する。
		memo[n] = int(count)

		// 合計に加算
		total += int64(count)
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	fmt.Printf("total=%d\n", total)
}
