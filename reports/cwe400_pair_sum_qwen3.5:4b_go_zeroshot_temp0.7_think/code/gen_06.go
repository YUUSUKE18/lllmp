package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	// 1 行目に目標値が与えられています
	if !scanner.Scan() {
		return
	}
	target, err := strconv.ParseInt(scanner.Text(), 10, 64)
	if err != nil {
		return
	}

	count := int64(0)
	seen := make(map[int64]int64)

	// 2 行目以降の整数を読み取る
	for scanner.Scan() {
		line := scanner.Text()
		// 空行は無視
		if len(line) == 0 {
			continue
		}

		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行も無視します
			continue
		}

		needed := target - val
		if freq, ok := seen[needed]; ok {
			count += freq
		}
		seen[val]++
	}

	// 出力：厳密に `pairs=<個数>` という 1 行（末尾に改行）
	fmt.Printf("pairs=%s\n", strconv.FormatInt(count, 10))
}
