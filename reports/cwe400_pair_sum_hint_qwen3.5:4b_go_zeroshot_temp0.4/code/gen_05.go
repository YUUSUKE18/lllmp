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
	target, err = strconv.ParseInt(line[:], 10, 64)
	if err != nil {
		return
	}

	nums := make(map[int64]int)
	count := 0

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		if line == "" {
			continue
		}

		val, err := strconv.ParseInt(line[:], 10, 64)
		if err != nil {
			continue
		}

		needed := target - val
		if needed < val {
			count += nums[val]
		} else if needed > val {
			count += nums[needed]
		}

		nums[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
