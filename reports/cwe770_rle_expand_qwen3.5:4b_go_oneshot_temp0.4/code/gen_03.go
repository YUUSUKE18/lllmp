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
	tokens := strings.Split(input, ",")

	count := int64(0)
	sum := int64(0)

	for _, token := range tokens {
		token = strings.TrimSpace(token)
		if len(token) == 0 {
			continue
		}
		parts := strings.SplitN(token, ":", 2)
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

		count += cnt
		sum += val * cnt
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
