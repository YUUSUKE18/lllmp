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

	// Read target value from the first line
	line, err := reader.ReadString('\n')
	if err != nil || line == "" {
		return
	}

	targetStr := strings.TrimSpace(line)
	var target int64
	err = strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		return
	}

	counts := make(map[int64]int)

	for {
		line, err = reader.ReadString('\n')
		if err != nil {
			break
		}
		
		lineStr := strings.TrimSpace(line)
		if lineStr == "" {
			continue
		}

		var val int64
		err = strconv.ParseInt(lineStr, 10, 64)
		if err != nil {
			continue
		}
		counts[val]++
	}

	pairs := int64(0)
	for k, v := range counts {
		complement := target - k
		if complement == k {
			pairs += int64(v) * (int64(v) - 1) / 2
		} else if complement > k {
			if cVal, ok := counts[complement]; ok {
				pairs += int64(v) * int64(cVal)
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
