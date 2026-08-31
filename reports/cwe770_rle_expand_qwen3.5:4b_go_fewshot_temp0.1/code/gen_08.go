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
	input := sc.Text()
	
	var count int64 = 0
	var sum int64 = 0
	
	parts := strings.Split(input, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		
		items := strings.Split(part, ":")
		if len(items) != 2 {
			continue
		}
		
		valStr, errVal := strconv.ParseInt(strings.TrimSpace(items[0]), 10, 64)
		countStr, errCount := strconv.ParseInt(strings.TrimSpace(items[1]), 10, 64)
		
		if errVal != nil || errCount != nil {
			continue
		}
		
		val := valStr
		cnt := countStr
		
		if cnt < 0 {
			continue
		}
		
		count += cnt
		sum += val * cnt
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
