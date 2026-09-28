package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var count int
	var sum int64
	
	for sc.Scan() {
		line := sc.Text()
		
		if len(line) == 0 || line == "\n" {
			continue
		}
		
		count++
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		sum += val
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
