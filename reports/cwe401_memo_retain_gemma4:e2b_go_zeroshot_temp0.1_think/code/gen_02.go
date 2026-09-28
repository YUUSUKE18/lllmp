package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 読み取りを高速化するため、bufio.Readerを使用
	reader := bufio.NewReader(os.Stdin)
	var totalSteps int64 = 0

	// メモ化テーブル: 既に計算済みの値とその手数を保存する
	// キー: n, 値: nから1に到達するまでの手数
	memo := make(map[int]int64)

	// 標準入力から1行ずつ読み込む
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			// EOFに達したら終了
			break
		}

		// 行末の改行文字を削除
		line = strings.TrimSpace(line)

		if line == "" {
			// 空行は無視
			continue
		}

		// 整数としてパースを試みる
		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// nが1の場合、手数は0
		if n == 1 {
			// 1は既にmemo化されている可能性があるが、ここでは0として処理
			if _, ok := memo[1]; !ok {
				memo[1] = 0
			}
			continue
		}

		// nがまだ計算されていない場合、計算を実行
		if _, ok := memo[n]; !ok {
			currentN := n
			steps := int64(0)

			// nが1になるまで繰り返す
			for currentN != 1 {
				if currentN == 0 {
					// 0に到達した場合（通常は発生しないが、安全のため）
					break
				}

				if currentN%2 == 0 {
					// nが偶数なら n/2
					currentN /= 2
				} else {
					// nが奇数なら 3n+1
					currentN = 3*currentN + 1
				}
				steps++
			}
			// 計算結果をメモ化
			memo[n] = steps
		}

		// 合計に加算
		if steps > 0 {
			totalSteps += steps
		}
	}

	// 結果を標準出力に出力
	fmt.Printf("total=%d\n", totalSteps)
}
