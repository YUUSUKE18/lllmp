package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	var lines int
	r := bufio.NewReader(os.Stdin)
	re := regexp.MustCompile(`^\s*(\d+(?:\s*[,]\s*\d+)*)?\s*$`)

	for {
		text, err := r.ReadBytes('\n')
		if err != nil {
			break
		}
		text = strings.TrimSpace(string(text))
		if re.MatchString(text) {
			lines++
		}
	}
	fmt.Printf("valid=%d\n", lines)
}
