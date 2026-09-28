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
		parts := strings.Fields(token)
		if len(parts) != 2 {
			continue
		}

		valStr, err := strconv.Atoi(parts[0])
		if err != nil {
			continue
		}

		countStr, err := strconv.ParseInt(parts[1], 10, 64)
		if err != nil {
			continue
		}

		count += countStr
		sum += int64(valStr*int(countStr))
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
