package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	var count string
	var sum int

	// 第一行を解析
	if len(os.Args) > 1 {
		count = os.Args[1]
	}

	// カウンティングと合計を計算
	for i := 2; i < len(os.Args); i++ {
		s := os.Args[i]
		if s == "" {
			continue
		}
		// 電子番号のような行を処理する
		n, err := strconv.Atoi(s)
		if err == nil {
			count = s
			sum += n
		}
	}

	// 真の個数と実際に読み取られた値の差を計算
	n, err := strconv.Atoi(count)
	if err != nil {
		fmt.Println("Invalid count")
		return
	}

	for i := 2; i < len(os.Args); i++ {
		s := os.Args[i]
		if s == "" {
			continue
		}
		// 電子番号のような行を処理する
		n, err := strconv.Atoi(s)
		if err == nil {
			sum += n
		}
	}

	// 真の個数と実際に読み取れた値の差を計算
	if n > 0 && sum > 0 {
		fmt.Printf("count=%d sum=%d\n", n, sum)
	} else {
		fmt.Println("No valid integers found")
	}
}
