package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	buf := make([]byte, 64*1024)
	found := false
	target := -1
	for {
		n, err := r.Read(buf)
		if err != nil {
			break
		}
		for i := 0; i < n; i++ {
			chars++
			if buf[i] == '\n' && !found {
				target = int64(buf[i+1])
				found = true
				break
			}
		}
	}
	if found {
		count := 0
		found := false
		for i := 0; i < len(buf); i++ {
			if buf[i] == '\n' {
				num, err := strconv.Atoi(string(buf[i+1:i+2]))
				if err != nil {
					continue
				}
				if num+target == target {
					count++
				}
				found = true
			}
		}
		fmt.Printf("pairs=%d\n", count)
	} else {
		fmt.Printf("no pairs\n")
	}
}
