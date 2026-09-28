package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	goal := 0
	pairs := 0
	lines := 0
	chars := 0

	for {
		_, err := sc.Read(buf)
		if err != nil {
			break
		}
		chars += 1
		if buf[i] == '\n' {
			lines++
		}

		if strings.TrimSpace(buf[chars]) != "" {
			n, err := strconv.Atoi(buf[chars])
			if err != nil {
				buf = buf[buf.Len()-chars:]
				continue
			}
			if n == goal {
				pairs++
			}
			if n > goal {
				pairs++
			}
			buf = buf[buf.Len()-chars:]
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
