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
	var first = true
	pairs := 0
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		if first {
			if _, err := strconv.Atoi(buf[:n]); err == nil {
				target = buf[:n]
				first = false
			}
			continue
		}
		if _, err := strconv.Atoi(buf[:n]); err == nil {
			n = strings.Index(buf[:n], ",") + 1
			if n > 0 {
				num, _ := strconv.Atoi(buf[:n])
				if num == target {
					pairs++
				}
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
