package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var nLine string
	if _, err := reader.ReadBytes('\n'); err != nil && len(nLine) == 0 {
		return
	}
	nString, err := strconv.Atoi(reader.ReadString('\n'))
	if err != nil {
		return
	}

	var sum int64 = 0
	var count int64 = 0

	for {
		line, err := reader.ReadString('\n')
		if err == io.EOF || line == "" {
			break
		}
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		parts := strings.Fields(line)
		for _, part := range parts {
			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue
			}
			sum += val
			count++
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
