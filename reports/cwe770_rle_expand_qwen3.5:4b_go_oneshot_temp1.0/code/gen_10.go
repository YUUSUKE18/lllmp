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
	
	lines := strings.Split(text, "\n")
	if len(lines) == 0 {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	count := int64(0)
	sum := int64(0)
	
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		
		parts := strings.Split(line, ",")
		if len(parts) == 0 {
			continue
		}

		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				continue
			}

			kv := strings.SplitN(part, ":", 2)
			if len(kv) != 2 {
				continue
			}

			valStr := strings.TrimSpace(kv[0])
			countStr := strings.TrimSpace(kv[1])

			val, errVal := strconv.ParseInt(valStr, 10, 64)
			count, errCount := strconv.Atoi(countStr)

			if errVal != nil || errCount != nil {
				continue
			}

			if val < 0 || count < 0 {
				continue
			}

			count += int64(count)
			sum += int64(val) * int64(count)
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
