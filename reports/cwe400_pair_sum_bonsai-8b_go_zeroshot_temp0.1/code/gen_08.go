package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var target string
	var numbers []int

	// 第1行を目標値として読み込む
	fmt.Scanln(os.Stdin, &target)
	if err := strconv.Atoi(target); err != nil {
		fmt.Println("0")
		return
	}

	// 前後の行を読み込む
	for {
		if err := strconv.Atoi(fmt.Scanln(os.Stdin)); err != nil {
			if err == io.EOF {
				break
			}
			continue
		}
		if err == io.EOF {
			break
		}
	}

	// 整数を抽出する
	for _, s := range numbers {
		if err := strconv.Atoi(s); err != nil {
			continue
		}
	}

	// 目標値と合計値を計算
	sum := 0
	for _, num := range numbers {
		sum += num
	}

	// 目標値に合った2つのペアを検索
	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if i != j && numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", pairs)
}
