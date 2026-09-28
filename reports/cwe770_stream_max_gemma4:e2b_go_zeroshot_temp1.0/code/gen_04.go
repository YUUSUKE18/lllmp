package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行読み込む
	input, err := os.ReadFile(0) // 標準入力全体を読み込む（ここではファイルディスクリプタ0を使用）
	if err != nil {
		// エラー処理（通常、競技プログラミング環境では入力は保証されることが多いが念のため）
		return
	}

	// 入力文字列を処理する
	inputStr := strings.TrimSpace(string(input))

	if inputStr == "" {
		// 入力が空の場合は何も出力しない（要素数0、最大値は定義できないため）
		fmt.Println("count=0 max=0") // または仕様に合わせた挙動だが、ここでは入力がないと解釈し、安全策として0を出力する。
		return
	}

	// カンマで分割
	parts := strings.Split(inputStr, ",")

	var count int
	var maxValue int64 = -1 // 64bit整数の範囲を考慮するため、初期値を非常に小さい値に設定（または最初の要素で上書き）

	isValid := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数としてパースを試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 有効な整数が見つかった場合
		count++

		if !isValid || val > maxValue {
			maxValue = val
			isValid = true
		}
	}

	// 最大値が設定されなかった（すべて無効だった）場合は、最大値を0とするなど適切なデフォルトが必要だが、
	// 少なくとも一つ有効な要素があれば上記で処理されている。
	// 空の入力以外で全ての要素が無視された場合 (count=0)、maxValueは初期値(-1)または特定の値になる。
	if count == 0 {
		// 入力があったが全て無効だった場合、ここでは最大値を0として扱うか、問題の意図に従う必要がある。
		// 仕様上「要素数と最大値」を求めるため、有効な要素がない場合はcount=0, max=0とするのが自然。
		fmt.Println("count=0 max=0")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
