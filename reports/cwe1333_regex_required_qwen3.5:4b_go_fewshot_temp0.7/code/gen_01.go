package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	var re *regexp.Regexp
	if err := re.Compile(`^[[:space:]]*(\d+)(,\s*\d+)*[,]?[[:space:]]*$`); err != nil {
		fmt.Printf("valid=0\n")
		return
	}

	lines := 0
	for {
		line, err := r.ReadString('\n')
		if err != nil && err != bufio.ErrBufferFull {
			break
		}
		line = strings.TrimSpace(line)
		if re.MatchString(line) {
			lines++
		}
	}
	fmt.Printf("valid=%d\n", lines)
}
