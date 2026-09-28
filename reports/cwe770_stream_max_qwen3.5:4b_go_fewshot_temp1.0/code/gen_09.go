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
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10))
		return
	}

	csvStr := sc.Text()
	maxVal := int64(-^uint64(0)) // -9223372036854775808 (最小値)
	count   := 0				// 有効要素数

	for _, part := range strings.Split(csvStr, ",") {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}

		val, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue // 整数として解釈できない場合は無視
		}

		count++
		if val > maxVal {
			maxVal = val
		}
	}

	fmt.Printf("count=%d max=%d\n", count, int(maxVal))
}
