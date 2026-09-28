package main

import (
	"fmt"
	"strings"
	"sync"
)

type Memo struct {
	memoMap map[int]int
}

func main() {
	memo := Memo{}
	memo.memoMap = make(map[int]int)

	// 味噌の入力（例として）
	input := strings.NewReader("123456789011121314151617181920212223242526272829303132333435")

	var total int
	var lines []string

	for input.Scan() {
		// 空行を無視し、数字を解釈
		if !input.Text() {
			continue
		}

		// 整数を割り出し
		nStr := strings.TrimSpace(input.Text())
		n, err := strconv.Atoi(nStr)
		if err != nil {
			continue
		}

		if n == 0 {
			continue
		}

		// メモ化チェック
		if num, ok := memo.memoMap[n]; ok {
			total += num
			continue
		}

		// メモ化を保存
		memo.memoMap[n] = 0
		num := n
		count := 0

		for num != 1 {
			num %= 2
			if num == 0 {
				num /= 2
			} else {
				num = 3*num + 1
			}
			count++
		}

		// 結果を合計に加算
		total += count
	}

	fmt.Printf("total=%d\n", total)
}
