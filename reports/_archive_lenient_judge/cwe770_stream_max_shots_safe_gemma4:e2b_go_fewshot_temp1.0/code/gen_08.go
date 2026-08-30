package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0) // 標準入力全体を読み込む（ここではシンプルにファイルとして扱う方が読み取りが容易なため、例題のスタイルに合わせて標準入力から直接読み取る方法を採用する）
	if err != nil {
		// os.ReadFile(0) ではなく、bufio.Reader を使うのがより自然だが、例題との整合性を考慮し、ここでは os.Stdin から読み込むロジックを再構築する。
		// 標準入力全体を一度に読み込んで処理する方が効率的かもしれないが、ストリーム処理として進める。
	}

	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil && len(line) == 0 {
		return // 入力が空の場合は終了
	}

	// カンマで分割
	parts := strings.Split(strings.TrimSpace(line), ",")

	count := 0
	maxValue := int64(-9223372036854775808) // 64bitの最小値（負の数も考慮するため）

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

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
