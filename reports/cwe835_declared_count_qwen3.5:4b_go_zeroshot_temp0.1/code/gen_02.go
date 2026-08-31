package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	
	var count int
	var sum int64
	
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	
	countStr := ""
	for i := 0; i < len(line); i++ {
		if line[i] == ' ' || line[i] == '\t' {
			continue
		}
		countStr += string(line[i])
	}
	
	var n int
	fmt.Sscanf(countStr, "%d", &n)
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		if line == "" {
			continue
		}
		
		parts := []string{}
		for i := 0; i < len(line); i++ {
			if line[i] == ' ' || line[i] == '\t' {
				continue
			}
			parts = append(parts, string(line[i:i+1]))
		}
		
		var val int64
		for _, p := range parts {
			v, err := strconv.ParseInt(p, 10, 64)
			if err != nil {
				continue
			}
			count++
			sum += v
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
