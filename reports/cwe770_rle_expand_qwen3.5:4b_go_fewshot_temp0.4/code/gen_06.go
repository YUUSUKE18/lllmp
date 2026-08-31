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
	pairs := strings.Split(input, ",")

	count := int64(0)
	sum := int64(0)

	for _, pair := range pairs {
		parts := strings.FieldsFunc(pair, func(r rune) bool {
			return r == ':' || r == ' '
		})
		if len(parts) != 2 {
			continue
		}

		valStr, ok1 := strconv.ParseInt(strings.TrimSpace(parts[0]), 10, 64)
		countStr, ok2 := strconv.ParseInt(strings.TrimSpace(parts[1]), 10, 64)

		if !ok1 || !ok2 {
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
