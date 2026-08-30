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

			// メモ化の更新（再帰的な呼び出しを避けるため、ここでは直接ステップ数を計算する）
			// 実際には、この問題は「1に到達するまでの手数」を求めるため、
			// 遷移を追跡するだけで十分であり、メモ化は到達した値からの残りステップを計算する形になる。
			// しかし、問題文の意図は「nから1に到達するまでの操作回数」なので、
			// 遷移を追跡するだけで十分であり、メモ化は「同じ値が再出現した場合の計算結果の再利用」に焦点を当てる。
			// ここでは、nから1へのパスを追跡し、そのパスの長さを数える。
			// 実際には、この問題はCollatz予想に関連しており、到達までのステップ数を求める。
			// 遷移を追跡するだけで十分であり、メモ化は到達した値からの残りステップを計算する形になる。
			// 簡略化のため、ここでは遷移を追跡するのみとし、メモ化は到達した値からのステップ数を格納する。
		}

		// 最終的なステップ数を合計に加算
		totalSteps += steps
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalSteps)
}
