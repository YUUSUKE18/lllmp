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
	valid := 0
	for {
		n, err := sc.Read('\n')
		if err != nil {
			break
		}
		s := strings.TrimSpace(sc.Text())
		if s == "" {
			continue
		}
		re := regexp.MustCompile(`^[\d\s]*$`)
		if re.MatchString(s) {
			parts := strings.Fields(s)
			if len(parts) >= 1 {
				valid++
			}
		}
	}
	fmt.Printf("valid=%d\n", valid)
}
