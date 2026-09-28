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
	maxValue := int64(-1e18) // 64bit整数の最小値に近い大きな値で初期化（負の数も考慮するため）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if val > maxValue {
			maxValue = val
		}
	}

	// 最大値が設定された場合のみ出力する（空の入力や数値が存在しない場合の安全策）
	if count > 0 {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 要素が一つもなかった場合、仕様に厳密に従うため何も出力しないか、あるいは適切なデフォルト値を設定する。
		// ここでは要素がない場合は count=0 max=（任意）とするが、最大値の定義が曖昧なため、count=0で終了する。
		fmt.Printf("count=0 max=%d\n", 0) // または単に何も出力しないことも考えられるが、形式に従う
	}
}
