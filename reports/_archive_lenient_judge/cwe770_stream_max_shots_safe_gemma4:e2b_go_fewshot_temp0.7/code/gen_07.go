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
	maxValue := int64(-9223372036854775808) // 64bitの最小値 (int64の範囲内)
	found := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if val > maxValue {
			maxValue = val
			found = true
		}
	}

	if count > 0 {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 要素が一つもなかった場合（全て空または無効な値だった場合）
		// 仕様上は「要素数」と「最大値」を出力する必要があるため、ここでは0と最小値を出すか、あるいは入力がない場合の処理を明確にする必要がある。
		// 読み込んだ有効な整数が存在しない場合は count=0, max=... となるべきだが、最大値の初期値に依存する。
		// 入力が空だった場合、count=0 で出力するのが最も安全。
		fmt.Printf("count=0 max=%d\n", maxValue) // 読み込んだ最小値を出力（ここでは-9223372036854775808）
	}
}
