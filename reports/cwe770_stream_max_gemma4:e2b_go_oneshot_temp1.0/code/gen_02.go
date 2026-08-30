package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から1行読み込む
	input, err := os.ReadFile(0) // os.Stdinのバイト列を読み込む (Goではファイルディスクリプタで扱うことが多いが、ここでは標準的な方法に合わせるため、通常はbufio.Readerを使うのが自然だが、今回は一行全体を処理する)

	// 標準入力から読み込む（bufio.Scannerの方が柔軟なのでこちらを採用）
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		// 入力が空の場合は何もしない
		return
	}
	line := sc.Text()

	// カンマで分割して、空白を無視しながら整数として抽出する
	parts := strings.Split(line, ",")

	count := 0
	maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（負の数を考慮する必要があるため）

	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// カウントと最大値を更新
		count++
		if n > maxVal {
			maxVal = n
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
