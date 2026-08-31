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
	input := sc.Text()
	totalCount := int64(0)
	totalSum := int64(0)
	parts := strings.Split(input, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		keyValParts := strings.SplitN(part, ":", 2)
		if len(keyValParts) != 2 {
			continue
		}
		keyStr := strings.TrimSpace(keyValParts[0])
		valStr := strings.TrimSpace(keyValParts[1])
		if keyStr == "" || valStr == "" {
			continue
		}
		key, errK := strconv.ParseInt(keyStr, 10, 64)
		if errK != nil {
			continue
		}
		val, errV := strconv.ParseInt(valStr, 10, 64)
		if errV != nil {
			continue
		}
		totalCount += val
		totalSum += key * val
	}
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
