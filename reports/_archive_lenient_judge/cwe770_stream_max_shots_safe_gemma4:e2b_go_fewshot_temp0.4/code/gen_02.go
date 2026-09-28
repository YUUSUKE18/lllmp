package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	line, err := r.ReadString('\n')
	if err != nil && len(line) == 0 {
		return
	}

	// カンマで分割
	parts := strings.Split(strings.TrimSpace(line), ",")

	count := 0
	maxValue := int64(-1e18) // 十分大きな負の値で初期化 (64bit整数を想定)

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
		}
	}

	// 空の要素が一つもなかった場合、最大値の設定をどうするか。
	// 仕様上「空でない語の数」と「最大値」を求めるため、要素が存在すれば count と maxValue を出力する。
	if count > 0 {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 要素が一つもなかった場合 (count=0)、最大値は定義できないため、ここでは0を出力するなど適切な処理が必要だが、
		// 例に従い、要素が存在しない場合は count=0 max=（任意の値）とする。
		// ここでは、入力が空だった場合の挙動を明確にするため、count=0, max=0 とします。
		fmt.Printf("count=0 max=0\n")
	}
}
