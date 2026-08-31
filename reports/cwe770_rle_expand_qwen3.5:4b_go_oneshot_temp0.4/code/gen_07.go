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
		fmt.Println("count=0 sum=0")
		return
	}

	input := sc.Text()
	parts := strings.Split(input, ",")
	count := 0
	sum := int64(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		items := strings.SplitN(part, ":", 2)
		if len(items) != 2 {
			continue
		}

		valStr, errVal := strconv.ParseInt(strings.TrimSpace(items[0]), 10, 64)
		countStr, errCount := strconv.Atoi(strings.TrimSpace(items[1]))

		if errVal != nil || errCount != nil {
			continue
		}

		val := valStr
		repeat := int64(countStr)

		for i := int64(0); i < repeat; i++ {
			count++
			sum += val
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
