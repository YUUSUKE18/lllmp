```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	target := 0
	for i, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		target += n
	}
	fmt.Printf("target=%d\n", target)
	sc.Scan()
	sc.Scan()
	n := 0
	for sc.Scan() {
		f := sc.Text()
		if f == "" {
			continue
		}
		n += len(strings.Fields(f))
	}
	fmt.Printf("pairs=%d\n", n)
}
