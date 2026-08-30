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
		fmt.Println("count=0 max=" + strconv.Itoa(0))
		return
	}

	input := sc.Text()
	tokens := strings.Fields(input) // 空白区切りで分割し、前後の空白を自動除去
	count := len(tokens)

	maxVal := int64(-1<<63 - 2)
	isFirst := true

	for _, token := range tokens {
		val, err := strconv.ParseInt(token, 10, 64)
		if err != nil {
			continue // 整数として解釈できない要素は無視する
		}
		if isFirst || val > maxVal {
			maxVal = val
			isFirst = false
		}

		count--
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
