package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var validLines int
	for {
		sc.Scan()
		if !sc.Err() {
			line := strings.TrimSpace(sc.Text())
			if line == "" {
				break
			}
			re := regexp.MustCompile(`^(\d+)(?:,(\d+))*$`)
			if re.MatchString(line) {
				validLines++
			}
		}
		if validLines == 0 {
			fmt.Println("valid=0")
			return
		}
		fmt.Printf("valid=%d\n", validLines)
	}
}
