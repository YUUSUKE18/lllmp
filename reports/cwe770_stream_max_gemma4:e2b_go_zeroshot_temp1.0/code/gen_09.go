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
		return // 入力がない場合は終了
	}
	line := scanner.Text()

	// カンマで分割して要素の文字列リストを取得する
	parts := strings.Split(line, ",")

	var count int64 = 0
	var maxValue int64 = -1 // 64bit整数の最小値より小さく初期化 (最大値を求めるため)
	foundNumber := false

	// 各要素を処理する
	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)

		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数として変換を試みる
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない場合は無視
			continue
		}

		// 有効な整数が見つかった場合
		count++
		
		if num > maxValue {
			maxValue = num
		}
		foundNumber = true
	}

	// 結果を出力する
	if foundNumber {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 有効な整数が一つも見つからなかった場合の処理 (仕様上は「要素数と最大値」を求めるため、0 0 のような形で出力するのが自然だが、
		// ここでは入力された数値が存在しない場合は何も出力しないか、または count=0 max=-1 のように扱う。
		// 問題文の制約から、少なくとも一つ有効な数が存在すれば上記で出力される。
		// 今回は読み込んだデータから得られた結果を出力する。もしデータが空や全て無効なら、count=0, max=? とする。
		// 仕様に従い、有効な数値が見つかった場合にのみ出力を試みる。ここでは、何も見つからなかった場合は何も出力しない（またはゼロ値を出す）。
		// 最も安全なのは、実際に処理した結果だけを出力すること。
	}
}
