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
	inputLine := scanner.Text()

	// カンマで分割して文字列の配列にする
	parts := strings.Split(inputLine, ",")

	var count int64 = 0
	var maxValue int64 = -1 // 最小値が負の場合を考慮するため、初期値を非常に小さい値に設定するか、最初の有効な値で初期化する

	// 有効な整数のみを処理する
	for _, part := range parts {
		// 前後の空白を削除
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

		// 要素数をカウントする
		count++

		// 最大値を更新する
		if val > maxValue {
			maxValue = val
		}
	}

	// 結果を出力する
	// countとmaxValueが有効な値を持っていることを確認（入力が空だった場合など）
	if count > 0 && maxValue != -1 {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else if count == 0 {
		// 要素が一つも有効でなかった場合、仕様上は何も出力しないか、あるいは適切なデフォルト値を出す必要があるが、
		// ここでは入力された要素に基づいた結果のみを出力する。もしcount=0なら、最大値の定義が曖昧になるため、
		// 厳密に「要素数と最大値」を求められなかった場合の処理は仕様にないので、ここでは何も出力しない（またはエラーとして扱う）。
		// ただし、入力があった場合は count >= 1 となるはず。
	}
}
