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
	valid := 0
	first := true
	for _, line := range strings.Fields(sc.Text()) {
		if len(line) == 0 {
			continue
		}
		parts := strings.Split(line, ",")
		if len(parts) > 0 {
			valid++
			first = false
		}
	}
	fmt.Printf("valid=%d\n", valid)
}
