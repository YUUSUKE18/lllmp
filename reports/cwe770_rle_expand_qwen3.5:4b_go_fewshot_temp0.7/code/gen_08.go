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
		return
	}

	input := strings.TrimSpace(sc.Text())
	pairs := strings.Split(input, ",")

	count := int64(0)
	sum := int64(0)

	for _, pair := range pairs {
		parts := strings.FieldsFunc(pair, func(r rune) bool {
			return r == ':' || r == '\t' || r == ' ' || r == '\n' || r == '\r'
		})
		if len(parts) != 2 {
			continue
		}

		valStr, valOk := parts[0]
		countStr, countOk := parts[1]

		if !valOk || !countOk {
			continue
		}

		val, err := strconv.ParseInt(valStr, 10, 64)
		if err != nil {
			continue
		}

		countNum, err := strconv.ParseInt(countStr, 10, 64)
		if err != nil || countNum < 0 {
			continue
		}

		for i := int64(0); i < countNum; i++ {
			count++
			sum += val
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
