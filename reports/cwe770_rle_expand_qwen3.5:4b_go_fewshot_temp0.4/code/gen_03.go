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
	totalCount := int64(0)
	sum := int64(0)

	for _, pairStr := range strings.Split(sc.Text(), ",") {
		pairStr = strings.TrimSpace(pairStr)
		if pairStr == "" {
			continue
		}

		parts := strings.Split(pairStr, ":")
		if len(parts) != 2 {
			continue
		}

		valueStr := strings.TrimSpace(parts[0])
		countStr := strings.TrimSpace(parts[1])

		if valueStr == "" || countStr == "" {
			continue
		}

		val, errVal := strconv.ParseInt(valueStr, 10, 64)
		cnt, errCnt := strconv.ParseInt(countStr, 10, 64)

		if errVal != nil || errCnt != nil {
			continue
		}

		if cnt < 0 {
			continue
		}

		totalCount += cnt
		sum += val * cnt
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, sum)
}
