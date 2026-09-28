package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力からデータを読み込む
	input, err := os.ReadFile(0) // os.Stdinを直接読み込む代わりに、ここではファイルディスクリプタ0を想定（実環境ではos.Stdinを使うのが一般的だが、Readfileで対応）
	if err != nil {
		// エラー処理（通常は無視されることが多いが、堅牢性を高めるため）
		return
	}

	data := string(input)
	
	// カンマで分割して整数列を取得
	fields := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな初期値 (負の無限大に相当)

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		// 整数への変換を試みる
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if n > maxValue {
			maxValue = n
		}
	}

	// 結果を厳密に1行で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
