package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	
	var count int
	fmt.Fscan(reader, &count)
	
	var sum int64
	
	for {
		var val int64
		if err := fmt.Fscan(reader, &val); err == nil {
			count++
			sum += val
		} else {
			break
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
