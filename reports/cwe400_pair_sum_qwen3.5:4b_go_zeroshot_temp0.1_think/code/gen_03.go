package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	line = strings.TrimSpace(line)
	if line == "" {
		return
	}
	targetVal, err := strconv.ParseInt(line, 10, 64)
	if err != nil {
		return
	}

	count := int64(0)
	numMap := make(map[int64]int64)

	for {
		line, err = reader.ReadString('\n')
		if err != nil {
			break
		}
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		complement := targetVal - val
		if c, ok := numMap[complement]; ok {
			count += c
		}
		numMap[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
