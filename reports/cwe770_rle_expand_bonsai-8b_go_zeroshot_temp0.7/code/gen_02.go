package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	for {
		input.Scan()
		if input.Err() {
			break
		}
		parts := strings.Split(input.String(), ",")
		count := 0
		sum := 0
		for _, part := range parts {
			if strings.Contains(part, ":") {
				split := strings.SplitN(part, ":", 2)
				if len(split) == 2 {
					val, _ := strconv.Atoi(split[0])
					num, _ := strconv.Atoi(split[1])
					if num >= 0 {
						count += num
						sum += val * num
					}
				}
			}
		}
		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
