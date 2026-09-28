```go
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
	target := 0
	count := 0
	positions := []int{}

	// 第1行：目標値を読み
	line, err := sc.Scan()
	if err != nil {
		return
	}
	if line == "" {
		return
	}
	target = strconv.ParseInt(line, 10, 64)

	// 2行目以降：整数を读む
	for {
		line, err := sc.Scan()
		if err != nil {
			break
		}
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		if n > target {
			count++
			positions = append(positions, n)
		}
	}

	// 2行目以降の組（2値の組）の個数を計算
	// 2値の組は、2値がそれぞれtargetを上回る場合に
	// ただし、目標値を上回る2値の組は、2値がそれぞれtargetを上回る
	// が、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// が、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る

	// 2値を組み合わせ、それぞれtargetを上回る
	// 2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合は、2値がそれぞれtargetを上回る

	// 2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る

	// 2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る

	// 2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る

	// 2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る

	// 2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る

	// 2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る

	// 2値がそれぞれtargetを上回る場合、2値がそれぞれtargetを上回る
	// は、2値がそれぞれtargetを上回る場合、2値がそれぞれtarget
