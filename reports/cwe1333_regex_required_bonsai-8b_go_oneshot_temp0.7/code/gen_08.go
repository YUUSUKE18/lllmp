package main

import (
	"regexp"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines []string
	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		re := regexp.MustCompile(`^(-?\d+)(?:,(-?\d+))*$`)
		if re.MatchString(line) {
			validLines = append(validLines, line)
		}
	}
	if len(validLines) < 1 {
		fmt.Println("valid=0")
	} else {
		fmt.Printf("valid=%d\n", len(validLines))
	}
}
