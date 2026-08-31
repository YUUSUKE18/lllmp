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
	totalSum := int64(0)
	
	for _, line := range strings.Split(sc.Text(), "\n") {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		
		parts := strings.Split(line, ",")
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				continue
			}
			
			fields := strings.Split(part, ":")
			if len(fields) != 2 {
				continue
			}
			
			valStr, errVal := strconv.ParseInt(strings.TrimSpace(fields[0]), 10, 64)
			countStr, errCount := strconv.Atoi(strings.TrimSpace(fields[1]))
			
			if errVal != nil || errCount != nil {
				continue
			}
			
			if valStr < 0 || countStr < 0 {
				continue
			}
			
			val := valStr
			count := int64(countStr)
			
			totalCount += count
			totalSum += val * count
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
