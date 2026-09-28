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
	if err != nil || line == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	n, err = strconv.Atoi(line)
	if err != nil || n <= 0 {
		fmt.Println("count=0 sum=0")
		return
	}

	var count int
	var sum int64
	scanner := bufio.NewScanner(reader)

	for scanner.Scan() {
		line = scanner.Text()
		if line == "" {
			continue
		}

		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		count++
		sum += int64(val)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
