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
		// 空行や整数として解釈できない行を無視
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

		// 繰り返し計算とメモ化
		currentN := n
		count := int64(0)

		for currentN != 1 {
			if result, ok := memo[currentN]; ok {
				count += result
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			count++
			memo[n] = count // nからスタートしたときの到達までの手数を記録
		}

		// 最終的な手数を加算
		if _, ok := memo[n]; ok {
			total += memo[n]
		} else {
			// メモ化がうまくいかなかった場合のフォールバック（通常は到達するはず）
			// ここでは、再帰的なメモ化をより直接的に行う方が安全だが、
			// 仕様に従い、上記ループの結果を合計に加算する。
			// 実際には、nが1になるまでのステップ数を直接計算する。
			// 再度、nから1までのステップ数を計算し直す（メモ化が複雑になるため、ここでは直接計算）
			tempN := n
			steps := int64(0)
			for tempN != 1 {
				if tempN%2 == 0 {
					tempN /= 2
				} else {
					tempN = 3*tempN + 1
				}
				steps++
			}
			total += steps
		}
	}

	// 最終結果の出力
	fmt.Printf("total=%d\n", total)
}
