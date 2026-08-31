package main

import (
	"bufio"
	"fmt"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(nil) // 空のスキャナーを初期化してエラー処理を簡略化

	var count int
	var sum int64

	// 行数 1 の値を読み取る (整数の個数)
	if scanner.Scan() {
		val, err := strconv.Atoi(scanner.Text())
		if err != nil {
			count = 0
		} else {
			count = val
		}
	}

	// 2 行目以降を読み込む (整数のみを処理)
	for scanner.Scan() {
		line := scanner.Text()
		
		// 空行は無視
		if line == "" {
			continue
		}

		// 整数として解釈できない行も無視
		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		sum += int64(val)
		count++
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
