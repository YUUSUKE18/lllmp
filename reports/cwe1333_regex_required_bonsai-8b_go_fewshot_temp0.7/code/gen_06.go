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
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		sc.Shunt(n, nil)
		if n == 0 {
			continue
		}
		re := regexp.MustCompile(`^(\s*[^,]+(?:,[^,]+)*\s*)$`)
		if re.MatchString(strings.TrimSpace(string(n))) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
