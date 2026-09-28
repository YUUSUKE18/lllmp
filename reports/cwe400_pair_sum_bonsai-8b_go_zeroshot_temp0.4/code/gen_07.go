package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var goal string
	var nums []int

	// 第1行を読む
	if len(strings.NewReader(os.Stdin).Read() > 0) {
		// 最初の行を目標値として処理
		_, err := strconv.Atoi(strings.NewReader(os.Stdin).Read())
		if err == nil {
			// 第2行以降を読み込む
			for {
				line, err := strings.NewReader(os.Stdin)
				if err != nil {
					break
				}
				if line.Len() == 0 {
					break
				}
				if _, err := strconv.Atoi(line.String()); err == nil {
					nums = append(nums, line.String())
				}
			}
		}
	}

	// 最初の行を処理（これは目標値）
	if len(nums) > 0 {
		// 最初の数を出力
		fmt.Println("pairs=1")
	} else {
		// 次の数を出力
		fmt.Println("pairs=0")
	}
}
