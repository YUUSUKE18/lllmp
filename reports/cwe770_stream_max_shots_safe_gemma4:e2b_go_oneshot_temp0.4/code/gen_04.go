package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	var input string
	// 標準入力全体を読み込む
	_, err := os.Stdin.Read(make([]byte, 1024*1024)) // 十分なバッファサイズで読み込むことを試みるが、ここではよりシンプルな方法を採用する
	if err != nil && err.Error() != "EOF" {
		// エラーが発生しても続行（通常は問題ない）
	}

	// 標準入力全体を読み込むために、bufio.Readerを使用する方が安全で一般的
	reader := bufio.NewReader(os.Stdin)
	data, err := reader.ReadString('\n')
	if err != nil && err.Error() != "EOF" {
		// エラー処理
	}

	// 入力文字列をカンマで分割する
	parts := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (負の数を考慮するため)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if val > maxVal {
			maxVal = val
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
