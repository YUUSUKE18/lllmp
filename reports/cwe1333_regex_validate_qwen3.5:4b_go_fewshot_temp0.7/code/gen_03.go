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
	validRows := 0
	for sc.Scan() {
		line := sc.Text()
		parts := strings.Split(line, ",")
		if len(parts) == 0 {
			continue
		}
		var first bool
		for _, p := range parts {
			s := strings.TrimSpace(p)
			if s == "" {
				first = true
				break
			}
			if !first {
				break
			}
			val, err := strconv.Atoi(s)
			if err != nil {
				break
			}
			first = false
		}
		if !first && len(parts) > 0 {
			validRows++
		}
	}
	fmt.Printf("valid=%d\n", validRows)
}
