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
	target := 0
	counts := 0
	for _, line := range sc.Lines() {
		if strings.TrimSpace(line) == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if n == target {
		 counts++
		}
		if n > target {
		 target = n
		}
	}
	fmt.Printf("pairs=%d\n", counts)
}
