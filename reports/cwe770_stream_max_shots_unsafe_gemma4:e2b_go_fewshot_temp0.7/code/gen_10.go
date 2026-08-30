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
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				if n, err := strconv.ParseInt(trimmedPart, 10, 64); err == nil {
					numbers = append(numbers, n)
				}
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理はここでは省略するが、実運用では考慮すべき
	}

	count := len(numbers)
	if count == 0 {
		// 要素が一つもなかった場合の処理（仕様上は最大値が存在しないため、適切な値を設定する必要があるが、
		// ここでは入力がない場合は 0 とおく）
		fmt.Printf("count=0 max=-1\n") // 最大値が存在しないため、-1などを設定することが多いが、ここでは安全のため0とするか、あるいは最小値を考慮する。
		// 問題文の制約から、もし入力が空なら最大値は定義できない。今回は「存在する要素のみを対象」と解釈し、空の場合は 0 と仮定する。
	} else {
		maxVal := numbers[0]
		for _, n := range numbers {
			if n > maxVal {
				maxVal = n
			}
		}
		fmt.Printf("count=%d max=%d\n", count, maxVal)
	}
}
