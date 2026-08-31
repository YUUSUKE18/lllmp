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
	sc.Scan()
	text := strings.TrimSpace(sc.Text())
	if text == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	count := 0
	sum := int64(0)

	parts := strings.Split(text, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		items := strings.Split(part, ":")
		if len(items) != 2 {
			continue
		}

		valStr, err1 := strconv.Atoi(strings.TrimSpace(items[0]))
		cntStr, err2 := strconv.Atoi(strings.TrimSpace(items[1]))

		if err1 != nil || err2 != nil {
			continue
		}

		val := int64(valStr)
		cnt := int64(cntStr)

		if cnt < 0 {
			continue
		}

		count += cnt
		sum += val * cnt
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
