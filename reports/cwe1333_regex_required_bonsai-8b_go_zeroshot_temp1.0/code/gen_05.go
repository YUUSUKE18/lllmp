package main

import (
	"fmt"
	"strings"
)

func main() {
	scanner := strings.NewScanner(os.Args)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		if !regexp.MatchString(`^(\d+)([, ]?\d+)*($|,$)`, line) {
			continue
		}
		count := 0
		split := strings.Split(line, ",")
		for _, s := range split {
			if s != "" {
				count++
			}
		}
		fmt.Printf("valid=%d\n", count)
	}
}
