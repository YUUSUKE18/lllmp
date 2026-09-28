package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	
	lineCount, err := strconv.Atoi(reader.ReadString('\n'))
	if err != nil {
		fmt.Println("count=0 sum=0")
		return
	}

	count := 0
	sum := int64(0)

	for {
		line, isPrefix, err := reader.ReadLine()
		if err != nil {
			break
		}
		
		if !isPrefix || len(line) == 0 {
			continue
		}

		var val int64
		
		start := 0
		end := 1
		for end <= len(line) {
			char := line[end]
			if char >= '0' && char <= '9' {
				break
			}
			end++
		}
		
		if end > start {
			numStr := string(line[start:end])
			val, err = strconv.ParseInt(numStr, 10, 64)
			if err == nil {
				sum += val
				count++
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
