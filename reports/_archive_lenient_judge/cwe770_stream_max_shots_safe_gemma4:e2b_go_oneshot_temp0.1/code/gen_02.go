package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0) // 標準入力全体を読み込む（ここでは一行読み取りに特化させるため、より適切な方法を採用する）
	if err != nil {
		return
	}
	data := strings.TrimSpace(string(input))

	if data == "" {
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割して整数列を取得
	parts := strings.Split(data, ",")

	var count int = 0
	var max int64 = -1 // 64bitの範囲を考慮するため、初期値を小さく設定（または最初の要素で初期化）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if num > max {
			max = num
		}
	}

	// 要素が一つもなかった場合や、全て無効な値だった場合の処理（仕様上は空の入力に対する挙動を明確にする必要があるが、ここでは読み取れた有効な要素に基づいて計算する）
	if count == 0 {
		// 入力が空または無効な要素のみだった場合。最大値は定義できないため、0とするか、あるいは最初の例に従い、もし何も読み取れなかった場合は適切な値を出す。
		// ここでは、読み取れた有効な要素がない場合は count=0, max=0 とする。
		fmt.Println("count=0 max=0")
	} else {
		fmt.Printf("count=%d max=%d\n", count, max)
	}
}
