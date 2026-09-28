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
	var counts map[int64]int = make(map[int64]int)

	line, err := reader.ReadString('\n')
	if err == nil && line != "" {
		line = strings.TrimSpace(line)
		if line != "" {
			target, _ = strconv.ParseInt(line, 10, 64)
		} else {
			return
		}
	}

	for {
		line, err := reader.ReadString('\n')
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
		counts[val]++
	}

	var ans int64 = 0
	for x, c := range counts {
		y := target - x
		if y == x {
			ans += (c * (c - 1)) / 2
		} else if y > x {
			if count, ok := counts[y]; ok {
				ans += int64(c) * int64(count)
			}
		}
	}

	fmt.Printf("pairs=%d\n", ans)
}
