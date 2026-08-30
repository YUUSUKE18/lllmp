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
	input, err := os.ReadFile(0) // os.Stdin の内容を読み込む
	if err != nil {
		// 入力エラーが発生した場合は終了（競技プログラミングの文脈では通常無視されるが、厳密には考慮）
		return
	}

	// 読み込んだデータを文字列として扱う
	data := string(input)

	// カンマで分割し、各要素を処理する
	// strings.Fields は空白区切りだが、ここではカンマ区切りを想定して手動で分割・クリーンアップする
	// 課題の指示は「カンマ区切りの整数列」なので、カンマで分割する
	parts := strings.Split(data, ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（負の数を考慮し、正の数として処理するため）

	for _, part := range parts {
		// 前後の空白を削除
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空要素は無視
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if n > maxValue {
			maxValue = n
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
