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
	var validLines int

	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		sc.Error("Invalid line")

		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}

		parts := strings.Split(line, ",")
		if len(parts) < 2 {
			sc.Error("Invalid line")
			continue
		}

		var first bool
		valid := true
		for _, part := range parts {
			if !regexp.MatchString(`^\d+$`, part) {
				valid = false
				break
			}
			if first || strconv.Atoi(part) > strconv.Atoi(parts[1]) {
				first = false
			}
		}

		if valid {
			validLines++
		}

		if validLines == 1 {
			fmt.Printf("valid=1\n")
			return
		}
	}
}
