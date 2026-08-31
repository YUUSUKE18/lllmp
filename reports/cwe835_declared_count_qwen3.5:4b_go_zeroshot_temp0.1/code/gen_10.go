package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	countStr := line
	count, err := strconv.Atoi(countStr)
	if err != nil {
		fmt.Println("count=0 sum=0")
		return
	}

	sum := int64(0)
	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line = scanner.Text()
		if line == "" {
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
