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
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil || n < 1 {
			continue
		}

		// メモ化された結果を保持するためのマップ
		memo := make(map[int]int64)

		// 繰り返し計算とメモ化
		currentN := n
		count := 0

		for currentN != 1 {
			// メモ化チェック
			if val, ok := memo[currentN]; ok {
				count += val
				break
			}

			// 操作の実行
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			count++
			
			// 循環を防ぐための安全策（この問題の性質上、1に到達するはずだが、念のため）
			// ただし、この問題の操作はコネルの予想（Collatz conjecture）であり、1に到達することが保証されていると仮定する。
			// もし非常に大きな数になる可能性がある場合は、到達不能なループを検出する必要があるが、
			// 問題の制約から、通常は到達するはず。

			// メモ化の更新
			if currentN == 1 {
				// 1に到達したときの総手数を計算する
				memo[n] = int64(count)
				break
			}
			
			// 途中で同じ数に戻った場合のループ防止（本来は不要だが、安全のため）
			// この問題では、新しい値が出現する限り進むため、このチェックは必須ではない。
		}
		
		// 1に到達した後の手数を計算し、合計に加算
		if _, ok := memo[n]; ok {
			total += memo[n]
		} else {
			// 理論上、到達しないことはないはずだが、念のためエラー処理やログが必要になる場合もある
			// 今回は問題の仕様に従い、到達したと仮定する。
		}
	}

	fmt.Printf("total=%d\n", total)
}
