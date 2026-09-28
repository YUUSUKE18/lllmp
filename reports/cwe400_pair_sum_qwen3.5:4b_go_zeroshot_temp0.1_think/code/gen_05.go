package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	// Read target value from the first line
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	line = strings.TrimSpace(line)
	if line == "" {
		return
	}

	var target int64
	target, err = strconv.ParseInt(line, 10, 64)
	if err != nil {
		return
	}

	count := int64(0)
	seen := make(map[int64]int64)

	// Read subsequent lines
	for {
		line, err = reader.ReadString('\n')
		if err == io.EOF || err != nil {
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

		complement := target - val
		if c, ok := seen[complement]; ok {
			count += c
		}
		seen[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
