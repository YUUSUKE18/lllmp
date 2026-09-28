package main

import (
	"fmt"
	"regexp"
	"strings"
)

func main() {
	r := regexp.MustCompile(`^(\d+)([,]\d+)*$`)
	var validLines []string

	for {
		line, err := fmt.Scanln(os.Stdin)
		if err != nil {
			break
		}
		line = strings.TrimSpace(line)
		if line == "" {
			break
		}
		if match, _ := r.MatchString(line); match {
			validLines = append(validLines, line)
		}
	}

	fmt.Printf("valid=%d\n", len(validLines))
}
