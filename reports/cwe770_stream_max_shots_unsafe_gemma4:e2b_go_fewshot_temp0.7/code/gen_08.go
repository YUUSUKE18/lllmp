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
	
	for scanner.Scan() {
		line := scanner.Text()
		// カンマで区切られた文字列を処理
		parts := strings.Split(line, ",")
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}
			
			// 整数として解釈を試みる
			n, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err == nil {
				numbers = append(numbers, n)
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理はここでは省略するが、実運用では考慮すべき
	}

	count := len(numbers)
	if count == 0 {
		// 要素がない場合の処理（仕様上、空の入力を想定しないが念のため）
		fmt.Println("count=0 max=0")
		return
	}

	maxVal := numbers[0]
	for _, n := range numbers {
		if n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
