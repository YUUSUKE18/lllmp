package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var target string
	var numbers []int

	// 最初の行を目標値として読み込む
	line := strings.NewReader("").ReadAllBytes([]byte{})
	if len(line) > 0 {
		target, _ = strconv.Atoi(line)
	}

	// 前後の行を読み取る
	for {
		line = strings.NewReader("").ReadAllBytes([]byte{})
		if len(line) == 0 {
			break
		}

		// 一行ずつを解析する
		lineStr := strings.TrimSpace(line)
		if lineStr == "" {
			continue
		}

		// 数値のみを抽出
		numStr := lineStr
		for i := len(numStr) - 1; i >= 0; i-- {
			if strconv.IsDigit(numStr[i]) {
				numStr = numStr[:i]
			}
		}

		// 数値が整数である場合にのみ追加
		if numStr != "" {
			num, _ := strconv.Atoi(numStr)
			numbers = append(numbers, num)
		}
	}

	// 目標値が0でなければ、0を含めるか、含まれない場合に0を追加
	if target != "0" {
		num, _ := strconv.Atoi(target)
		numbers = append(numbers, num)
	}

	// 個数を計算する
	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}

	// 組を出力
	fmt.Printf("pairs=%d\n", pairs)
}
