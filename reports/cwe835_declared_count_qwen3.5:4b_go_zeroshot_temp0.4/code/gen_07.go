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
		os.Exit(1)
	}

	countStr := string(line)
	if countStr == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	n, err := strconv.Atoi(countStr)
	if err != nil {
		fmt.Println("count=0 sum=0")
		return
	}

	sum := int64(0)
	foundCount := 0

	for {
		line, err = reader.ReadString('\n')
		if err != nil {
			break
		}

		line = line[:len(line)-1] // 末尾の改行を除去
		if line == "" {
			continue
		}

		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		sum += val
		foundCount++
	}

	fmt.Printf("count=%d sum=%d\n", foundCount, sum)
}
