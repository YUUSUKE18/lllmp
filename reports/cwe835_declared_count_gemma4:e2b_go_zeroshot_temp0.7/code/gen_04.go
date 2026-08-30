package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var count int
	var sum int64 = 0
	actualCount := 0

	// 1行目を読み取る
	if scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// 空行は無視されるが、ここでは読み取りを続行する
		} else {
			// 1行目の値が整数の個数であると想定するが、実際に読み取れる数で判断する
			if num, err := strconv.Atoi(line); err == nil {
				count = num
			} else {
				// 1行目が整数でない場合は、読み取りを続行する（仕様上は1行目は整数と仮定されるが、堅牢性のため）
			}
		}
	}

	// 2行目以降を読み取り、合計を計算する
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		if num, err := strconv.ParseInt(line, 10, 64); err == nil {
			// 整数として読み取れた場合
			sum += num
			actualCount++
		}
	}

	// 実際に読み取れた個数と合計を出力する
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
