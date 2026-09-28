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

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			totalSteps += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		// 繰り返し計算とメモ化
		currentN := n
		steps := int64(0)

		for currentN != 1 {
			if val, ok := memo[currentN]; ok {
				steps += val
				currentN = 1 // 1に到達したと仮定してループを抜ける
				break
			}

			// 置き換え操作
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++

			// メモ化の更新（再帰的なメモ化の考え方）
			// ここでは、現在の値から1に到達するまでのステップ数を計算し、
			// その結果をメモに保存する。
			// ただし、この問題は「nが1になるまでの手数」を求めるため、
			// 遷移を追跡する方が直接的である。
		}

		// 最終的なステップ数を合計に加算
		totalSteps += steps
	}

	// 最終結果の出力
	fmt.Printf("total=%d\n", totalSteps)
}
