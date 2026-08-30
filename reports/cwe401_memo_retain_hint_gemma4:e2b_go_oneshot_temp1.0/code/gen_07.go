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
		// 空行は無視
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			// 整数として解釈できない行は無視
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

		// 現在のnから1に到達するまでの手数を計算
		currentN := n
		steps := int64(0)

		// 探索中に同じ値に到達したかチェックし、メモ化された値を使う
		for currentN != 1 {
			if steps > 2000000 { // 安全のための上限設定（LUCAS数列の性質から非常に速く収束するため、これは実質的な無限ループ防止として機能する）
				// もし非常に遅い場合は、メモ化が正しく機能しているか確認
				break
			}
			
			if result, ok := memo[currentN]; ok {
				steps += result
				currentN = 1 // 既に1に到達したと仮定
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 実際の計算結果をmemoに追加（もしループが正常に終了した場合）
		if currentN == 1 {
			memo[n] = steps
		}
		
		// 計算した手数を合計に加算
		if steps > 0 {
			total += steps
		}
	}

	fmt.Printf("total=%d\n", total)
}
