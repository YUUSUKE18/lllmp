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
		fmt.Println("count=0 max=")
		return
	}

	fields := strings.Fields(sc.Text())
	count := 0
	maxVal := -9223372036854775808 // 最小値より小さい初期値として扱うため、実際に最初の有効な値をセットするロジックに修正

	for _, f := range fields {
		n, err := strconv.ParseInt(f, 10, 64)
		if err != nil {
			continue
		}
		count++
		if count == 1 || n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
