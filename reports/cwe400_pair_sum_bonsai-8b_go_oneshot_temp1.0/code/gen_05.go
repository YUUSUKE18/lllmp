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
	first := true
	pairs := 0
	for _, line := range strings.Fields(sc.Text()) {
		if first {
			if _, err := strconv.Atoi(line); err != nil {
				continue
			}
			target = 0
			first = false
		} else {
			if _, err := strconv.Atoi(line); err != nil {
				continue
			}
			if target+int(line) > target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
