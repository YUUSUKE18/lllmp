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
	text := sc.Text()
	tokens := strings.Split(text, ",")

	count := int64(0)
	sum := int64(0)

	for _, token := range tokens {
		token = strings.TrimSpace(token)
		if len(token) == 0 || strings.ContainsAny(token, " ") {
			continue
		}

		parts := strings.SplitN(token, ":", 2)
		if len(parts) != 2 {
			continue
		}

		valStr, errVal := strconv.Atoi(strings.TrimSpace(parts[0]))
		countStr, errCount := strconv.Atoi(strings.TrimSpace(parts[1]))

		if errVal != nil || errCount != nil {
			continue
		}

		val := int64(valStr)
		n := int64(countStr)

		if n < 0 {
			continue
		}

		count += n
		sum += val * n
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
