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
	var foundTarget bool

	// Read Target from the first valid integer line
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = strings.TrimSpace(line)
		if len(line) == 0 {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Ignore non-integer lines
		}
		target = val
		foundTarget = true
		break
	}

	if !foundTarget {
		return
	}

	mapVal := make(map[int64]int)
	pairs := int64(0)

	// Read Array Elements from subsequent lines
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = strings.TrimSpace(line)
		if len(line) == 0 {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Ignore non-integer lines
		}

		needed := target - val
		if count, ok := mapVal[needed]; ok {
			pairs += count
		}
		mapVal[val]++
	}

	fmt.Printf("pairs=%d\n", pairs)
}
