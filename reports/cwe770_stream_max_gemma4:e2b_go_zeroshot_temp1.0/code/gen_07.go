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

	var count int64 = 0
	var maxValue int64 = -1 // 最小値を想定し、最初の有効な値が最大値になるように初期化

	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として解析を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if val > maxValue {
			maxValue = val
		}
	}

	// countが0の場合は、maxの出力も適切に行う必要があるが、仕様では入力がない場合の挙動は明記されていないため、
	// 入力が空または無効な場合でも、見つかった要素に基づいた結果を出力する。
	// ただし、仕様に従い「要素数」と「最大値」を求める。データが存在しなければ0や適切なデフォルト値とする。

	if count == 0 {
		// 要素が一つもなかった場合の処理（例えば、最大値を未定義とするか）
		// ここでは、入力された有効な要素が0個の場合、count=0, maxは特定できない状態となる。
		// 厳密に「求めます」という指示に従い、もしデータがなければ、ゼロベースで出力する。
		fmt.Println("count=0 max=-1") // または他の適切な値だが、ここでは-1を採用
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
