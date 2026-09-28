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

	count := int64(0)
	sum := int64(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		fields := strings.Fields(part)
		if len(fields) != 2 {
			continue
		}

		valStr, errVal := strconv.Atoi(strings.TrimSpace(fields[0]))
		countStr, errCount := strconv.Atoi(strings.TrimSpace(fields[1]))

		if errVal != nil || errCount != nil {
			continue
		}

		val := int64(valStr)
		repeat := int64(countStr)

		count += repeat
		sum += val * repeat
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
