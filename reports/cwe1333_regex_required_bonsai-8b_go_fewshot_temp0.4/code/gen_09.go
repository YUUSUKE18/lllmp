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
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		sc.Shunt(n)
		if n == 0 {
			break
		}
		re := regexp.MustCompile(`^(\s*[0-9]+\s+)+(\s*[0-9]+\s+)?$`)
		if re.MatchString(string(sc.Text())) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
