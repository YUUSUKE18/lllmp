package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var targetStr string
	var numbers []int

	// 第1行を目標値として読み込む
	line, err := fmt.Scan(os.Stdin)
	if err != nil {
		return
	}
	if err == fmt.ErrnoUnexpectedEOF {
		return
	}
	if err == fmt.ErrnoEmpty {
		return
	}
	targetStr, _ = line

	// パースする
	target, _ := strconv.Atoi(targetStr)

	// 后続の行を処理
	for {
		line, err := fmt.Scan(os.Stdin)
		if err != nil {
			if err == fmt.ErrnoUnexpectedEOF {
				break
			}
			return
		}
		if err == fmt.ErrnoEmpty {
			continue
		}
		if s, _ := strconv.Atoi(line); s <= 0 {
			continue
		}
		numbers = append(numbers, s)
	}

	// 個数を計算
	count := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	// 出力
	fmt.Printf("pairs=%d\n", count)
}
