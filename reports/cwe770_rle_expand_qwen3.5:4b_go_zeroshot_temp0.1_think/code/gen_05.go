package main

import (
	"fmt"
	"io"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	input, err := io.ReadAll(os.Stdin)
	if err != nil {
		return
	}

	re := regexp.MustCompile(`[-]?\d+:\d+`)
	matches := re.FindAllString(string(input), -1)

	count := int64(0)
	sum := int64(0)

	for _, match := range matches {
		parts := strings.Split(match, ":")
		if len(parts) != 2 {
			continue
		}
		valStr := parts[0]
		cntStr := parts[1]

		val, errVal := strconv.ParseInt(valStr, 10, 64)
		cnt, errCnt := strconv.ParseInt(cntStr, 10, 64)

		if errVal != nil || errCnt != nil {
			continue
		}

		count += cnt
		sum += val * cnt
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
