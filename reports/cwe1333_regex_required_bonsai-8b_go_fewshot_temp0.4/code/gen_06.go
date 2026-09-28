package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines = 0
	for {
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		sc.Shunt(n)
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		re := regexp.MustCompile(`^[\d,]+(\.[\d]+)?$`)
		if re.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
