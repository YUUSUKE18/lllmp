package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	input, err := reader.ReadString('\n')
	if err != nil {
		fmt.Println("count=0 sum=0")
		return
	}

	lines := strings.Split(input, "\n")
	count := 0
	sum := 0

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		for i := 0; i < len(parts); i++ {
			entry := strings.TrimSpace(parts[i])
			if entry == "" {
				continue
			}
			pair := strings.Split(entry, ":")
			if len(pair) != 2 {
				continue
			}
			valStr, ok1 := strings.TrimSpace(pair[0])
			countStr, ok2 := strings.TrimSpace(pair[1])
			if !ok1 || !ok2 || valStr == "" || countStr == "" {
				continue
			}
			val, errVal := strconv.Atoi(valStr)
			cnt, errCnt := strconv.Atoi(countStr)
			if errVal != nil || errCnt != nil || cnt < 0 {
				continue
			}
			count += cnt
			sum += int64(val) * int64(cnt)
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
