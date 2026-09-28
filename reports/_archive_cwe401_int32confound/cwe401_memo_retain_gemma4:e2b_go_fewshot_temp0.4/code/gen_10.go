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
		memo := make(map[int]int64)

		var count int64 = 0
		currentN := n

		for currentN != 1 {
			if count > 1000000 { // 安全のための上限設定（実際には不要な場合が多いが、念のため）
				break
			}
			if result, found := memo[currentN]; found {
				count += result
				currentN = 1 // 1に到達したと仮定してループを抜ける
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			count++
		}

		// 1に到達したときのステップ数を計算し、メモ化する
		// ここでは、元のnから1に到達するまでのステップ数を計算する。
		// 実際には、各クエリ n について、nから1に到達するまでのステップ数を計算し、その合計を求める必要がある。
		// 課題の指示を再解釈: 各クエリ n について、操作を繰り返して 1 に到達するまでの手数を求め、その合計を求める。

		// 再度、各クエリ n について、nから1に到達するまでのステップ数を計算するロジックを適用する。
		// メモ化は、同じ中間値が何度も現れる場合に有効。

		// 最初の計算（メモ化なし）を再実行し、メモ化を適用する。
		// 課題の意図を「各クエリ n について、nから1に到達するまでのステップ数を求める」と解釈する。

		// 簡略化のため、各nに対して直接計算する（メモ化は、同じnが複数回入力される場合に有効だが、ここでは1行ずつ処理するため、各処理内で計算する）。

		// 課題の指示に従い、nから1に到達するまでの手数を計算する。
		// 1が目標であり、nが入力される。
		// n=1 のときの手数は 0。
		// nが偶数なら n/2、奇数なら 3n+1。

		// 最初のnから1へのパスを計算する。
		steps := 0
		current := n
		if n == 1 {
			steps = 0
		} else {
			for current != 1 {
				if current%2 == 0 {
					current /= 2
				} else {
					current = 3*current + 1
				}
				steps++
			}
		}

		total += int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}
