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
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力がない場合は終了
		return
	}

	inputLine := scanner.Text()

	// カンマで分割し、空白を除去して整数を抽出する
	parts := strings.Split(inputLine, ",")

	// 重複を除いた整数を格納するためのマップを使用する (64bit整数として扱うため map[int]bool を使用)
	seen := make(map[int]bool)

	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として解釈を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェックと記録
		seen[num] = true
	}

	// 個数と合計を計算する
	count := len(seen)
	var sum int64 = 0

	for num := range seen {
		sum += int64(num)
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
