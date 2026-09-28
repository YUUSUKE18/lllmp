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
	maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（負の数も考慮できるように）

	for scanner.Scan() {
		line := scanner.Text()
		// カンマ区切りの整数列を処理するため、行ごとに分割して処理するのではなく、
		// 入力全体を読み込んでカンマで分割する方が自然。
		// しかし、この問題は「標準入力からカンマ区切りの整数列を受け取る」という文脈なので、
		// 複数の行にまたがるデータが与えられた場合も考慮し、すべてを結合してから処理するのが安全。

		// ここでは、stdin全体を読み込み、スペースやカンマで区切る方法を採用する（例1, 2のパターンを踏襲）
	}

	data, err := os.ReadFile(0) // 標準入力全体を読み込む
	if err != nil {
		return
	}

	inputStr := string(data)
	// カンマ区切りで分割
	parts := strings.Split(inputStr, ",")

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
