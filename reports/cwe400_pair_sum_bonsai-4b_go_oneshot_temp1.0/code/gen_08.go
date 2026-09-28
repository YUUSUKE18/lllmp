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
	lines := []
	for {
		line, err := sc.Scan()
		if err != nil {
			if err == io.EOF {
				break
			}
			continue
		}
		if strings.TrimSpace(line) == "" {
			continue
		}
		_, err = strconv.Atoi(line)
		if err != nil {
			continue
		}
		lines = append(lines, err)
	}
	if len(lines) < 2 {
		fmt.Printf("max=0\n")
		return
	}
	max := lines[0]
	for i := 1; i < len(lines); i++ {
		n, err := strconv.Atoi(lines[i])
		if err != nil {
			continue
		}
		if n > max {
			max = n
		}
	}
	count := 0
	for i := 0; i < len(lines); i++ {
		for j := i + 1; j < len(lines); j++ {
			if lines[i] == lines[j] {
				count++
			}
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
