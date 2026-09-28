package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化テーブル
	memo := make(map[int]int64)
	memo[1] = 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		// 空白区切りで整数をパース
		fields := strings.Fields(line)
		for _, field := range fields {
			n, err := strconv.Atoi(field)
			if err != nil {
				continue
			}

			if n <= 0 {
				continue
			}

			// メモ化された値の計算
			current := int64(n)
			steps := int64(0)
			
			// 1 に到達するまでの手数を計算
			for current != 1 {
				if current <= 0 {
					// 1 に到達できない、または無効な状態（仕様上は発生しないはずだが安全策）
					break
				}
				if current%2 == 0 {
					current /= 2
				} else {
					current = 3*current + 1
				}
				steps++
			}
			
			// 結果を合計に加算
			total += steps

			// メモ化の更新（この問題では、直接計算したステップを保存するより、再帰的な構造を考えるとDPが自然だが、今回は単一のクエリに対する計算と合計なので、このループ内で直接計算する）
			// memo[n] = steps // これは、nから1への最短経路を計算しているため、nからスタートするクエリに対する答えとしては不要かもしれないが、指示に従い計算を実行する。
		}
	}

	// 最終結果の出力
	fmt.Printf("total=%d\n", total)
}
