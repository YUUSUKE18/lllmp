package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	scanner := bufio.NewScanner(r)
	
	var count int
	var sum int64
	
	scanner.Scan()
	nStr := scanner.Text()
	count, _ = strconv.Atoi(nStr)
	
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		count++
		sum += val
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
