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
	if err != nil || line == "" {
		return
	}
	
	s := strings.TrimSpace(line)
	if len(s) > 0 {
		target, _ = strconv.ParseInt(s, 10, 64)
	}

	seen := make(map[int64]int)
	count := int64(0)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		s = strings.TrimSpace(line)
		if len(s) == 0 {
			continue
		}

		val, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}

		needed := target - val
		if c, ok := seen[needed]; ok {
			count += int64(c)
		}
		seen[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
