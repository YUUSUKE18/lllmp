package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行全体を読み込む
	input, err := os.ReadFile(0) // os.Stdin を直接使う代わりに、ここでは一般的なファイル読み込みのパターンを踏襲し、実際には os.Stdin を使用するべきだが、標準入力処理のため os.ReadFile(0) は使わず、bufio.Reader を用いるのがより適切。
	if err != nil {
		// 実際の競技プログラミング環境では、ここではエラーハンドリングを簡略化し、読み込みを試みる。
		// ファイル読み込みの代わりに os.Stdin を使う方法を採用する。
		scanner := bufio.NewScanner(os.Stdin)
		if !scanner.Scan() {
			return // 入力が空の場合
		}
		input = scanner.Text()
	} else {
		// もし ReadFile を使った場合（この問題では入力全体を一度に読む方が簡単）
		// 実際には、stdinからの読み込み方法を調整する。
        // 今回は標準的な競技プログラミングのセットアップとして、直接 os.Stdin から読み込む処理に修正する。
	}

	// bufio.Scanner を使って標準入力から読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return // 入力が空の場合
	}
	line := scanner.Text()

	// カンマで分割して要素のリストを得る
	parts := strings.Split(line, ",")

	var count int64 = 0
	var maxValue int64 = -1 // 最小値を想定し、最初の有効な値が最大値になるように初期化（または非常に小さな値）

	// 各要素を処理する
	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数に変換を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if val > maxValue {
			maxValue = val
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
