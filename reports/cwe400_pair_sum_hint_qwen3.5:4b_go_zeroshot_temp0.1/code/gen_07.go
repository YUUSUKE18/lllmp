package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	line, err := reader.ReadString('\n')
	if err != nil || line == "" {
		return
	}
	target, err = fmt.ScanInt64(line)
	if err != nil {
		return
	}

	count := 0
	nums := make(map[int64]int)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = line[:len(line)-1] // Remove newline
		if line == "" {
			continue
		}
		val, err := fmt.ScanInt64(line)
		if err != nil {
			continue
		}

		complement := target - val
		if count, ok := nums[complement]; ok {
			count += 1
			nums[val] = count
		} else {
			nums[val] = 1
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
