package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から1行を読み込む
	input, err := os.ReadFile(0) // os.Stdinを直接読み込むための一般的な方法 (ただし、ここではbufioを使う方が一般的だが、例に合わせるためtry)
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割し、各要素を処理する
	fields := strings.Split(strings.TrimSpace(data), ",")
	
	// 重複を除いた整数を格納するためのマップと合計用の変数を初期化
	seen := make(map[int64]bool)
	var count int64 = 0
	var sum int64 = 0

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		// 整数としてパースを試みる
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェックと集計
		if !seen[n] {
			seen[n] = true
			count++
			sum += n
		}
	}

	// 指定された形式で結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
