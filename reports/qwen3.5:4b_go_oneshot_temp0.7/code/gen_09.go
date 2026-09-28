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
	
	var counts map[int]int = make(map[int]int)
	var sum int64 = 0
	
	parts := strings.Split(input, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		
		val, err := strconv.Atoi(part)
		if err != nil {
			continue
		}
		
		counts[val]++
		sum += int64(val)
	}
	
	c := 0
	for _, v := range counts {
		c += v
	}
	
	fmt.Printf("count=%d sum=%d\n", c, sum)
}
