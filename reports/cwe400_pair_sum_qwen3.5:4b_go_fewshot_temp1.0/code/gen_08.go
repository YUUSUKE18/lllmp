package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var line string
	var target int64
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	target, _ = strconv.ParseInt(strings.TrimSpace(line), 10, 64)

	sum := make(map[int64]int)
	count := 0
	for {
		line, err := reader.ReadString('\n')
		if len(line) == 0 && err != nil {
			break
		}
		if strings.TrimSpace(line) == "" {
			continue
		}
		val, err := strconv.ParseInt(strings.TrimSpace(line), 10, 64)
		if err != nil {
			continue
		}
		complement := target - val
		if c, ok := sum[complement]; ok {
			count += c
		}
		sum[val]++
	}
	fmt.Printf("pairs=%d\n", count)
}

import (
	"strings"
)
