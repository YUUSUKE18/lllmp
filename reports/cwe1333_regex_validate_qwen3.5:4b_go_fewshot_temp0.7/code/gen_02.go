package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	validLines := 0

	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		var num int
		for _, s := range parts {
			s = strings.TrimSpace(s)
			if s == "" {
				break
			}
			n, err := strconv.Atoi(s)
			if err != nil {
				validLines--
				break
			}
			num = n
		}
		if err == nil {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
