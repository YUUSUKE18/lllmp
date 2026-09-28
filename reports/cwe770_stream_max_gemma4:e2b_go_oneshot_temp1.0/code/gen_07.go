package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}
	line := scanner.Text()

	// カンマで分割
	parts := strings.Split(line, ",")

	count := 0
	maxVal := int64(-1e18) // 64bit整数の範囲を考慮するため、非常に小さい値で初期化
	found := false

	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// カウントと最大値の更新
		count++
		if n > maxVal {
			maxVal = n
		}
		found = true
	}

	// 要素が存在する場合のみ結果を出力する（仕様上、空列が与えられた場合の挙動を明確にするため）
	// ただし、問題文は「要素数と最大値を求めます」とあるため、入力された有効な数値の数をカウントし、その最大値を求める。

	if found {
		fmt.Printf("count=%d max=%d\n", count, maxVal)
	} else {
		// 有効な整数が一つもなかった場合（例: 空行または非数値のみ）
		fmt.Printf("count=0 max=-1\n") // または適切なデフォルト値。ここでは最大値を初期値（-1e18相当）で保持したまま、個数0とする。
	}
}
