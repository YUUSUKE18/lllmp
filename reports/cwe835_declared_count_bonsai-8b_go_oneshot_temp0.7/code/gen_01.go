package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	countStr, _ := strconv.Atoi(sc.Text())
	count := 0
	sum := 0
	for {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			break
		}
		_, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		count++
		sum += line
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
