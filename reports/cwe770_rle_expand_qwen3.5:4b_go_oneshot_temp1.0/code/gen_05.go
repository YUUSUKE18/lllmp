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
	line := sc.Text()
	parts := strings.Split(line, ",")
	totalCount := int64(0)
	totalSum := int64(0)
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		kv := strings.SplitN(part, ":", 2)
		if len(kv) != 2 {
			continue
		}
		val, err1 := strconv.ParseInt(strings.TrimSpace(kv[0]), 10, 64)
		count, err2 := strconv.Atoi(strings.TrimSpace(kv[1]))
		if err1 != nil || err2 != nil {
			continue
		}
		if val < 0 || count < 0 {
			continue
		}
		totalCount += int64(count)
		totalSum += val * int64(count)
	}
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
