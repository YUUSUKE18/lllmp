package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力全体を読み込む
	input, err := os.ReadFile(0) // os.Stdinのバイト列を読み込む
	if err != nil {
		// 入力エラーはここでは無視するか、適切にエラー処理を行うが、
		// 競技プログラミングの文脈では通常想定されない。
		return
	}
	data := string(input)

	// カンマで分割し、各要素を処理する
	parts := strings.Split(data, ",")
	
	seen := make(map[int64]bool)
	count := 0
	sum := int64(0)

	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない場合は無視
			continue
		}

		// 重複チェックと合計の計算
		if !seen[n] {
			seen[n] = true
			count++
			sum += n
		}
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
