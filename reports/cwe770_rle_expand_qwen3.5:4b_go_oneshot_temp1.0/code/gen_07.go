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
	pairs := strings.Split(line, ",")

	count := int64(0)
	sum := int64(0)

	for _, pair := range pairs {
		pair = strings.TrimSpace(pair)
		if len(pair) == 0 || !isRLEFormat(pair) {
			continue
		}

		parts := strings.SplitN(pair, ":", 2)
		if len(parts) != 2 {
			continue
		}

		valueStr, countStr := parts[0], parts[1]
		value, err := strconv.Atoi(valueStr)
		if err != nil {
			continue
		}

		c, err := strconv.ParseInt(countStr, 10, 64)
		if err != nil || c < 0 {
			continue
		}

		count += c
		sum += int64(value) * c
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func isRLEFormat(s string) bool {
	if len(s) == 0 || strings.ContainsAny(s, ":") {
		return false
	}
	parts := strings.SplitN(s, ":", 2)
	if len(parts) != 2 {
		return false
	}
	v, _ := strconv.Atoi(parts[0])
	c, err := strconv.Atoi(parts[1])
	return (err == nil) && (c >= 0) && parts[0] != "" && parts[1] != ""
}
