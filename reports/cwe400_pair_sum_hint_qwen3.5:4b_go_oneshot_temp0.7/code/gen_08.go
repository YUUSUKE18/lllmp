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
	target, err = strconv.ParseInt(line[0:len(line)-1], 10, 64)
	if err != nil {
		fmt.Println("pairs=0")
		return
	}

	nums := make([]int64, 0)
	for {
		line, err := reader.ReadString('\n')
		if err == io.EOF || line == "" {
			break
		}
		str := strings.TrimSpace(line)
		if str == "" {
			continue
		}
		n, err := strconv.ParseInt(str, 10, 64)
		if err != nil {
			continue
		}
		nums = append(nums, n)
	}

	count := int64(0)
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
