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

	// 1 行目に目標値が与えられます
	targetLine, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	targetStr := strings.TrimSpace(targetLine)
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		fmt.Println("pairs=0")
		return
	}

	count := int64(0)
	seen := make(map[int64]int64)

	for {
		line, err := reader.ReadString('\n')
		if err == io.EOF {
			break
		}
		if err != nil {
			continue
		}

		line = strings.TrimSpace(line)
		if len(line) == 0 {
			continue
		}

		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		complement := target - val
		if c, ok := seen[complement]; ok {
			count += int64(c)
		}
		seen[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
