package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, _ := reader.ReadString('\n')
	if len(line) == 0 {
		return
	}

	countLine, _ := strconv.Atoi(line)
	
	var sum int64
	var processedCount int
	
	reader2 := bufio.NewScanner(reader)
	for reader2.Scan() {
		lineStr := reader2.Text()
		
		line = lineStr
		
		if len(line) == 0 {
			continue
		}

		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		
		sum += int64(val)
		processedCount++
	}

	fmt.Printf("count=%d sum=%d\n", processedCount, sum)
}
