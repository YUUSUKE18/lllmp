package main

import (
	"bufio"
	"fmt"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	
	var count int
	sum := 0
	
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		
		parts := strings.Fields(line)
		if len(parts) < 1 {
			continue
		}
		
		count++
		
		val, err := strconv.ParseInt(parts[0], 10, 64)
		if err != nil {
			continue
		}
		sum += val
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
