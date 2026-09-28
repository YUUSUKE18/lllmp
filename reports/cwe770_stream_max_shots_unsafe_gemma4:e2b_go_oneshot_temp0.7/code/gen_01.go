package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil && err.Error() != "EOF" {
		// エラーが発生したがEOFでない場合は処理を中断（通常は問題の制約上不要だが念のため）
		return
	}

	// カンマで分割し、空白を除去して整数に変換する
	fields := strings.Split(strings.TrimSpace(line), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (または最小のint64)

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
		if n > maxValue {
			maxValue = n
		}
	}

	// 指定された形式で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
