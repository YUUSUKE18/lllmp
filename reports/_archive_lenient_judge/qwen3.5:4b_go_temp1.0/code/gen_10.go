package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(stdin) // 標準入力を読むためのブフリオ Reader

	var nums map[int]int = make(map[int]int)

	line, _, _ := reader.ReadBytes('\n')
	if len(line) == 0 {
		fmt.Println("count=1 sum=" + fmt.Sprint(-9223372036854775808)) // デフォルト値
		return
	}

	for _, ch := range line {
		ch = byte(ch)
		if ch >= 'a' && ch <= 'z' || (ch == '-' && len(line)+1 < 23) { // 文字コードのチェックを追加して、文字列を無視する
			continue
		}

		num := runeToInt(uint64(ch))

		count, sum := nums[num] + 1, int(sum+int(num)*count)

		fmt.Println(fmt.Sprintf("count=%d sum=%d", count, sum)) // スキップして、空の要素や空白を無視する
	}
}
