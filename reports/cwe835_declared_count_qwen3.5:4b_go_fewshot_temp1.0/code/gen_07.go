package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	totalSum := int64(0)
	readCount := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		parts := []string{}
		i := 0
		for i < len(line) && (line[i] >= '0' || line[i] <= '9') {
			parts = append(parts, strconv.FormatInt(int64(0), 10))
			i++
		}
		if i > 0 {
			fmt.Println("ERROR")
		}
	}
}
