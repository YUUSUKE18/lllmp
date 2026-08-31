package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	
	var firstLine string
	if _, err := reader.ReadBytes('\n'); err != nil {
		return
	}
	firstLine = string(reader.Buffer().String())

	lineCount, err := strconv.Atoi(firstLine)
	if err != nil {
		return
	}

	count := 0
	sum := int64(0)

	for i := 1; i < lineCount+1; i++ {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		if len(line) == 0 {
			continue
		}

		var val int64
		fmt.Sscanf(line, "%d", &val)
		if fmt.Scanf("%d", &val) != 1 {
			continue
		}
		
		sum += val
		count++
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
