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
	
	var count int64
	var total int64
	
	parts := strings.Split(input, ",")
	for _, part := range parts {
		parts = strings.FieldsFunc(part, func(r rune) bool { return r == ':' })
		if len(parts) != 2 {
			continue
		}

		strVal := strings.TrimSpace(parts[0])
		strCount := strings.TrimSpace(parts[1])
		
		val, err := strconv.ParseInt(strVal, 10, 64)
		if err != nil {
			continue
		}

		countNum, err := strconv.ParseInt(strCount, 10, 64)
		if err != nil || countNum < 0 {
			continue
		}

		count += countNum * val
		total += val * countNum
	}

	fmt.Printf("count=%d sum=%d\n", count, total)
}
