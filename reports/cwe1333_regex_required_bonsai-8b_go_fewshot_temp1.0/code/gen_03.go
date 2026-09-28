package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
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
		if strings.TrimSpace(buf[:n]) == "" {
			continue
		}
		re := regexp.MustCompile(`^([0-9]+)(?:,[0-9]+)*$`)
		if re.MatchString(buf[:n]) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
