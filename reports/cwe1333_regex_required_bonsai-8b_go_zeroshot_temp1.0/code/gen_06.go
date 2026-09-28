package main

import (
	"fmt"
	"os"
	"regexp"
)

func main() {
	r := regexp.MustCompile(`^[\s]*([1-9][0-9]*[,\s]*)+[1-9][0-9]*$`)
	for {
		line, err := os.ReadFile("input.txt")
		if err != nil {
			break
		}
		line = regexp.MustCompile(`^\s*-\s*`).ReplaceAllString(line, "")
		line = regexp.MustCompile(`^\s*-\s*`).ReplaceAllString(line, "")
		line = regexp.MustCompile(`^\s*-\s*`).ReplaceAllString(line, "")
		if r.MatchString(line) {
			fmt.Println("valid=3")
		}
	}
}
