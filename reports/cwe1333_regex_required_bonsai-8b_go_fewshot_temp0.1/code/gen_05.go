package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines int
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		sc.Scan()
		if strings.TrimSpace(buf[:n]) == "" {
			continue
		}
		re := regexp.MustCompile(`^(\d+)(?:,\d+)*$`)
		if re.MatchString(buf[:n]) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
