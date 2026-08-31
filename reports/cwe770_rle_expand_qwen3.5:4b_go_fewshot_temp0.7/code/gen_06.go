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
	
	var sum int64 = 0
	count := 0
	
	for sc.Scan() {
		line := sc.Text()
		parts := strings.Split(line, ",")
		
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				continue
			}
			
			colons := strings.SplitN(part, ":", 2)
			if len(colons) != 2 {
				continue
			}
			
			valStr := strings.TrimSpace(colons[0])
			countStr := strings.TrimSpace(colons[1])
			
			if valStr == "" || countStr == "" {
				continue
			}
			
			var val int64
			var err error
			if val, err = strconv.ParseInt(valStr, 10, 64); err != nil {
				continue
			}
			
			var num int64
			if num, err = strconv.ParseInt(countStr, 10, 64); err != nil {
				continue
			}
			
			sum += val * num
			count += num
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
