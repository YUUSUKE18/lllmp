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
	var target int64

	// Read target from the first line
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	line = strings.TrimSpace(line)
	if line == "" {
		return
	}
	target, err = strconv.ParseInt(line, 10, 64)
	if err != nil {
		return
	}

	count := make(map[int64]int64) // map value -> frequency
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

		needed := target - val
		if neededVal, ok := count[needed]; ok {
			pairs += neededVal
		}
		count[val]++
	}

	fmt.Printf("pairs=%d\n", pairs)
}
