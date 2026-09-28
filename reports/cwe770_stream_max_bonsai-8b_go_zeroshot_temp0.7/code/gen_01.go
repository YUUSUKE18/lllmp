package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var numbers []string

	// スタッドインから一整数ずつ読み込む
	for {
		fmt.Print("> ")
		var line string
		_ = bufio.NewReader(os.Stdin).Readln(&line)
		if line == "" {
			break
		}
		numbers = append(numbers, line)
	}

	count := 0
	max := -1

	// リストを処理
	for _, numStr := range numbers {
		// 空格や空白を除き、数字のみを取る
		parts := strings.Fields(numStr)
		if len(parts) == 0 {
			continue
		}
		// 全ての数字をチェック
		for _, part := range parts {
			if idx, err := strconv.Atoi(part); err == nil {
				// 値が64bit整数範囲に収まる
				if idx > max {
					max = idx
				}
				count++
			}
		}
	}

	// 最大値が初期値でない場合、更新
	if max == -1 {
		fmt.Println("count=0 max=-1")
	} else {
		fmt.Printf("count=%d max=%d\n", count, max)
	}
}
