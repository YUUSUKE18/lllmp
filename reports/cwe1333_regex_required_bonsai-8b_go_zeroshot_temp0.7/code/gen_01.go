package main

import (
	"fmt"
	"os"
	"regexp"
)

func main() {
	scanner := regexp.MustCompile(`^([0-9]+(?:,[0-9]+)+)$`)
	for {
		line, err := os.Readln(os.Stdin)
		if err != nil {
			if err == os.ErrUnexpectedEOF {
				fmt.Println("valid=0")
				return
			}
			fmt.Println("invalid")
			return
		}
		if err == os.ErrNoLine {
			fmt.Println("valid=0")
			return
		}
		line = strings.TrimSpace(line)
		if scanner.MatchString(line) {
			fmt.Printf("valid=%d\n", len(line.split(',')))
		} else {
			fmt.Println("invalid")
		}
	}
}
