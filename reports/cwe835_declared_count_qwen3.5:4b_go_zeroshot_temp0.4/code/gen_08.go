package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var n int
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	n, err = strconv.Atoi(strings.TrimSpace(line))
	if err != nil || n <= 0 {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	var sum int64
	count := 0
	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line := scanner.Text()
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
