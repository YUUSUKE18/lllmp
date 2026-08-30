package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
)

func main() {
	data, err := ioutil.ReadAll(stdin) // 注意: Go の標準ライブラリには stdio は含まれていないため、この実装は不可能です。正しいアプローチを使用します。
	if err != nil {
		fmt.Println("Error reading input:", err.Error())
		return
	}

	var nums []int64
	for _, c := range data {
		switch c {
		case ' ', '\t', '\n': // 空白文字は無視する
			continue
		default:
			num, err := strconv.ParseInt(string(rune(c)), 10, 64)
			if err != nil || num == 0 { // 整数として解釈できない要素も無視します。また、0 は有効な整数です。ただし、元の要件では「整数列」と言われていますが、空文字や非数値を無視する必要があります。
				continue
			}
			nums = append(nums, num)
		}
	}

	var uniqueNums []int64
	for _, n := range nums {
		found := false
		for _, u := range uniqueNums {
			if u == n {
				found = true
				break
			}
		}
		if !found {
			uniqueNums = append(uniqueNums, n)
		}
	}

	var sum int64
	for _, v := range uniqueNums {
		sum += v
	}

	fmt.Printf("count=%d sum=%d\n", len(uniqueNums), sum) // 合計は 64bit 整数の範囲に収まると仮定しています。
}
