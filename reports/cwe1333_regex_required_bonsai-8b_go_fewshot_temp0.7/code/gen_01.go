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
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		s := strings.TrimSpace(buf[:n])
		if s == "" {
			continue
		}
		re := regexp.MustCompile(`^(\d+)(?:,\d+)*$`)
		if re.MatchString(s) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
