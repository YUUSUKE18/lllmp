package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(strings.NewReader(""))
	
	var count int64
	var sum int64
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
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
			
			items := strings.Split(part, ":")
			if len(items) != 2 {
				continue
			}
			
			valueStr, err1 := strconv.ParseInt(strings.TrimSpace(items[0]), 10, 64)
			countStr, err2 := strconv.ParseInt(strings.TrimSpace(items[1]), 10, 64)
			
			if err1 != nil || err2 != nil {
				continue
			}
			
			value := valueStr
			repeat := countStr
			
			count += repeat
			sum += value * repeat
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
