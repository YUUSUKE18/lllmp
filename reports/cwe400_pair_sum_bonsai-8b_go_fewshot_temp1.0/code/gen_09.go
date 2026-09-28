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
	remaining := 0
	pairs := 0
	words := []string{}
	for {
		n, err := sc.Read([]byte(64*1024))
		if err != nil {
			if err == io.EOF {
				break
			}
			break
		}
		for i := 0; i < n; i++ {
			if buf[i] == '\n' {
				break
			}
		}
		if err != nil {
			break
		}
		if strings.TrimSpace(buf) != "" {
			n, err := strconv.Atoi(buf)
			if err != nil {
				continue
			}
			if remaining == 0 {
				target = n
				remaining = n
			} else {
				remaining -= n
				if remaining == 0 {
					pairs++
				} else {
					if n == target {
						pairs++
					}
				}
			}
		}
		if err != nil {
			break
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
