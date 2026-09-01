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
		fmt.Println("pairs=0")
		return
	}

	targetVal, err := fmt.Sscanf(line, "%d", &target)
	if targetVal != 1 || err != nil {
		fmt.Println("pairs=0")
		return
	}

	count := int64(0)
	sumByIdx := make(map[int64]struct{})

	for {
		line, err = reader.ReadString('\n')
		if err == io.EOF || line == "" {
			break
		}
		line = string(line)
		if line == "" {
			continue
		}
		val, err := fmt.Sscanf(line, "%d", &val)
		if val != 1 || err != nil {
			continue
		}

		diff := target - val
		if _, ok := sumByIdx[diff]; ok {
			count++
		}
		sumByIdx[val] = struct{}{}
	}

	fmt.Printf("pairs=%d\n", count)
}
