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
	var numbers []int64
	
	// 標準入力から全て読み込む
	inputData, err := os.ReadFile(0) // 0は標準入力ファイルディスクリプタ
	if err != nil {
		// エラーが発生しても無視して続行（通常、stdinからの読み取りでは問題になることは少ないが、念のため）
		return
	}
	
	inputStr := string(inputData)
	// カンマで分割
	parts := strings.Split(inputStr, ",")
	
	count := 0
	maxVal := int64(0)
	
	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}
		
		numbers = append(numbers, n)
		count++
		if n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
