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
	input := sc.Text()
	if len(strings.TrimSpace(input)) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}

	count := int64(0)
	sum := int64(0)
	parts := strings.Split(input, ",")

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}
		fields := strings.SplitN(part, ":", 2)
		if len(fields) != 2 {
			continue
		}

		valStr, err1 := strconv.ParseInt(strings.TrimSpace(fields[0]), 10, 64)
		countStr, err2 := strconv.ParseInt(strings.TrimSpace(fields[1]), 10, 64)

		if err1 != nil || err2 != nil {
			continue
		}

		val := valStr
		cnt := countStr

		if cnt < 0 {
			continue
		}

		count += cnt
		sum += val * cnt
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
