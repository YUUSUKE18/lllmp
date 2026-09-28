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
	lines := 0
	words := 0
	target := 0
	for _, line := range sc.Lines() {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		_, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if target == 0 {
			target = line
			lines++
		}
		if line == target {
			words++
		}
	}
	pairs := 0
	for i := 0; i < lines; i++ {
		if i >= 1 {
			_, err := strconv.Atoi(sc.Text().SplitLines(i)[i])
			if err != nil {
				continue
			}
			if err := target > 0 && err == nil; err == nil {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
