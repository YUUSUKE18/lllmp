package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if sc.Scan() {
		line := sc.Text()
		if idx := strings.Index(line, "="); idx != -1 {
			target = atoi(line[idx+1:])
		}
	} else {
		return
	}

	var sums map[int64]int
	sums = make(map[int64]int)
	found := 0
	for sc.Scan() {
		line := sc.Text()
		if strings.Contains(line, "=") || line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		diff := target - val
		if count, ok := sums[diff]; ok {
			found += count
		}
		sums[val] = 1
	}

	fmt.Printf("pairs=%d\n", found)
}
