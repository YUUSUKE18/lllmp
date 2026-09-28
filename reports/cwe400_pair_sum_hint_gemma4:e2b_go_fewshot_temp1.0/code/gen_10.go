package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	
	// 1行目：目標値の読み込み
	if !sc.Scan() {
		// 入力が空の場合は終了
		return
	}
	targetStr := sc.Text()
	target, err := strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
	if err != nil {
		// 目標値のパースエラーはここでは無視しないが、仕様上は1行目に目標値が与えられると仮定する
		return
	}

	// 2行目以降の整数の読み込み
	var numbers []int64
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			numbers = append(numbers, n)
		}
	}

	if len(numbers) == 0 {
		fmt.Println("pairs=0")
		return
	}

	// 2個の組の個数を求める
	count := 0
	n := len(numbers)

	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", count)
}
