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
	valid := 0
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		if n == 0 {
			continue
		}
		sc.Scan()
		reg := regexp.MustCompile(`^[\s,]+([1-9]\d*)+([,\s])?$`)
		if reg.MatchString(buf[:n]) {
			valid++
		}
	}
	fmt.Printf("valid=%d\n", valid)
}
