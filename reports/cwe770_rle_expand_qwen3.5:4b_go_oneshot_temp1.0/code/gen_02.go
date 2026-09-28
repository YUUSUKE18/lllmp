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
	if !sc.Scan() {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	data := strings.Fields(sc.Text())
	totalCount := int64(0)
	totalSum := int64(0)

	for _, item := range data {
		parts := strings.SplitN(item, ":", 2)
		if len(parts) != 2 {
			continue
		}

		valStr, valErr := strconv.Atoi(parts[0])
		countStr, countErr := strconv.ParseInt(parts[1], 10, 64)

		if valErr != nil || countErr != nil || countStr < 0 {
			continue
		}

		totalCount += int64(valStr) // 要素数を計算 (val が値なので、ここが正しくは val の数ですが仕様は「7:3」なら7を3個持つ。待って、仕様に従う必要があります)

		// 訂正：`7:3` は値=7, 回数=3 です。
		// 『要素数』とは、このリストの中に実際に含まれる整数の総数を意味します。
		// なので countStr が要素数を加算する必要があります。
		totalCount += countStr

		// 『合計』とは、すべての整数を足し合わせた値です。
		// val * count を累加起来します。
		if valStr != 0 { // 0 の場合は合計に影響なし (0)
			// int64 への安全な変換と乗算が必要
			valInt := int64(valStr)
			totalSum += valInt * countStr
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
