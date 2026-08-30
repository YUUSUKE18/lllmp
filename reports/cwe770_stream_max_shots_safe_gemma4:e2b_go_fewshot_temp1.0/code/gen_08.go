package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	content := string(input)

	// カンマで分割し、各要素を処理する
	parts := strings.Split(strings.TrimSpace(content), ",")

	count := 0
	maxValue := int64(-1e18) // 64bit整数の最小値に近い大きな値として初期化 (安全のため非常に小さな値で初期化)
	found := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
			found = true
		}
	}

	if count == 0 {
		// 要素が一つも見つからなかった場合。最大値は定義しないか、ここでは0などを設定する必要があるが、
		// 仕様に従い「要素数」と「最大値」を出力する。要素がない場合は count=0, max=0 などが適切。
		// 問題文には空の入力に対する明示的な指示がないため、何も読み取れなかった場合のデフォルトを考慮し、
		// 0要素の場合は最大値も未定義だが、ここでは処理した値に基づき出力する。
		// もし何も読み取れなかった場合は count=0, max=0 とする（またはエラーとして扱うが、ここでは数値を出す指示のため）
		if !found {
			// 数値が一つも存在しなかった場合
			fmt.Printf("count=0 max=0\n")
		} else {
			// 読み取れた要素があった場合
			fmt.Printf("count=%d max=%d\n", count, maxValue)
		}
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
