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
		// 入力が空の場合は何も出力しない（仕様上は想定されないが安全策として）
		return
	}
	line := scanner.Text()

	// カンマで分割して整数列を取得
	fields := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (負の数を考慮するため、非常に大きな正の値で初期化する方が安全だが、ここではまずは最初の有効な値を探す)
	foundFirst := false

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if !foundFirst || n > maxValue {
			maxValue = n
			foundFirst = true
		}
	}

	// 全ての数値が有効であった場合のみ、カウントと最大値を計算する
	if count > 0 {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 有効な整数が一つもなかった場合（空行や無効な入力のみの場合）
		// この場合、カウントは0、最大値の出力は省略するか、定義に従う。ここでは数値を読み取れなかった場合は何も出力しないのが適切と判断する。
	}
}
