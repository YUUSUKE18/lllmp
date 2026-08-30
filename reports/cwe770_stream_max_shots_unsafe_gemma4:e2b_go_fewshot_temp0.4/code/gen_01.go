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
	count := 0
	maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (実質的なマイナス無限大として扱う)

	for scanner.Scan() {
		line := scanner.Text()
		// カンマ区切りの整数列を処理するため、各行を個別に処理するのではなく、
		// 標準入力全体を読み込み、カンマで分割する方が意図に合致する。
		// 例1, 2の形式に従い、標準入力全体を一度に処理する方針を採用する。
	}

	data, err := os.ReadFile(0) // 標準入力全体を読み込む
	if err != nil {
		return
	}

	inputStr := string(data)
	// カンマで分割し、空白を除去して整数としてパースする
	parts := strings.Split(inputStr, ",")
	
	count = 0
	maxVal = -1 << 63 // 64bit整数の最小値に近い大きな値

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
