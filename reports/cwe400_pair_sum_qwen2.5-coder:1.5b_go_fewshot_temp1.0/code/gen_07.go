package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	buf := make([]byte, 64*1024)
	target := 0
	pairs := 0
	for {
		n, err := r.Read(buf)
		for i := 0; i < n; i++ {
			if buf[i] == '\n' {
				break
			}
		}
		if err != nil {
			break
		}
		line := strings.TrimSpace(string(buf[:i]))
		if len(line) == 0 {
			continue
		}
		v, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		target += v
		if target == 0 {
			pairs++
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
