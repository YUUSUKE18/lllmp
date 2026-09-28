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
		return
	}
	line := scanner.Text()
	parts := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（実際には最初の要素で上書きされるため、十分大きな値で初期化）
	foundFirst := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			continue // 整数として解釈できない要素は無視
		}

		count++
		if !foundFirst || n > maxValue {
			maxValue = n
			foundFirst = true
		}
	}

	// 空の入力や数値が存在しなかった場合の処理（問題文からは明示されていないが、安全のため）
	if count == 0 {
		// 何も読み込まれなかった場合、count=0, max=0 または適切なデフォルト値を出す。ここでは読み込んだ要素がない場合は0を出力する。
		fmt.Printf("count=0 max=0\n")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
