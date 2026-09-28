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
	if err != nil || line == "" {
		return
	}
	
	targetLine := strings.TrimSpace(line)
	target, err := strconv.ParseInt(targetLine, 10, 64)
	if err != nil {
		return
	}

	seen := make(map[int64]int)
	pairs := int64(0)

	for {
		line, err := reader.ReadString('\n')
		if err == io.EOF {
			break
		}
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

		complement := target - val
		if count, ok := seen[complement]; ok {
			pairs += int64(count)
		}
		seen[val]++
	}

	fmt.Printf("pairs=%s\n", strconv.FormatInt(pairs, 10))
}
