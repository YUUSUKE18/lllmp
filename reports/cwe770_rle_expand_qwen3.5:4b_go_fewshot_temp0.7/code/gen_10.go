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

	totalCount := 0
	sumValue := int64(0)

	for _, part := range strings.Split(sc.Text(), ",") {
		parts := strings.Fields(strings.TrimSpace(part))
		if len(parts) != 2 {
			continue
		}

		valStr, err1 := strconv.Atoi(strings.TrimSpace(parts[0]))
		countStr, err2 := strconv.Atoi(strings.TrimSpace(parts[1]))
		if err1 != nil || err2 != nil {
			continue
		}

		if countStr < 0 {
			continue
		}

		val := int64(valStr)
		count := int64(countStr)

		totalCount += count
		sumValue += val * count
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, sumValue)
}
