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
	if err := strconv.Atoi(sc.Text()); err == nil {
		target = 0
	}
	sc.Scan()
	var pairs int
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		if err == io.EOF {
			break
		}
		if strings.TrimSpace(buf[:n]) != "" {
			n, err := strconv.Atoi(buf[:n])
			if err == nil {
				if n != 0 {
					for i := 0; i < len(buf); i++ {
						if buf[i] == '\n' {
							pairs++
							break
						}
					}
				}
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
