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
	
	count, err = strconv.Atoi(line)
	if err != nil {
		return
	}
	
	for i := 0; i < count; i++ {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		line = line[:len(line)-1] // Remove newline character
		if len(line) == 0 {
			continue
		}
		
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		
		sum += val
		count++
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
