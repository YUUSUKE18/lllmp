package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	
	// 1 行目から整数の個数を読み取る（ただし、実際の行数や有効な整数の数に基づいて処理を行うため、この値は主に参考）
	var lineCount int64
	scanner := bufio.NewScanner(reader)
	if scanner.Scan() {
		count, err := strconv.ParseInt(scanner.Text(), 10, 64)
		if err == nil {
			lineCount = count
		}
	}

	sumVal := int64(0)
	actualCount := int64(0)

	// 2 行目以降を読み込む（while ループで EOF やエラーまで続ける）
	for scanner.Scan() {
		text := scanner.Text()
		
		// 空行は無視
		if text == "" {
			continue
		}

		val, err := strconv.ParseInt(text, 10, 64)
		if err != nil {
			// 整数として解釈できない場合は無視
			continue
		}

		sumVal += val
		actualCount++
	}

	// エラーが発生した場合は停止
	if scanner.Err() != nil {
		return
	}

	fmt.Printf("count=%d sum=%d\n", actualCount, sumVal)
}
