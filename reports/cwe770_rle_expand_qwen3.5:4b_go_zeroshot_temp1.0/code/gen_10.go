package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(reader: func() *bufio.Reader {
		return bufio.NewScanner(strings.NewReader(""))
	}())
	data, err := reader.ReadBytes('\n')
	if err != nil {
		fmt.Println("count=0 sum=0")
		return
	}

	parts := strings.Split(data, ",")
	count := 0
	sum := int64(0)

	for _, part := range parts {
		s := strings.TrimSpace(part)
		if s == "" {
			continue
		}

		fragments := strings.Split(s, ":")
		if len(fragments) != 2 {
			continue
		}

		valStr, ok1 := strconv.ParseInt(strings.TrimSpace(fragments[0]), 10, 64)
		countStr, ok2 := strconv.Atoi(strings.TrimSpace(fragments[1]))

		if !ok1 || !ok2 || countStr < 0 {
			continue
		}

		val := valStr
		cnt := int64(countStr)

		sum += val * cnt
		count += cnt
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
