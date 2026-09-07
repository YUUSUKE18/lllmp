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
	total := 0
	seen := make(map[int]int)
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
		for i, f := range strings.Fields(buf[:i]) {
			if seen[f] != 0 {
				continue
			}
			seen[f] = i + 1
			num, err := strconv.Atoi(f)
			if err != nil {
				continue
			}
			if num == 1 {
				total++
				continue
			}
			seen[num] = i + 1
			count := 0
			for num != 1 {
				if num%2 == 0 {
					num /= 2
				} else {
					num = 3*num + 1
				}
				count++
			}
			total += count
		}
	}
	fmt.Printf("total=%d\n", total)
}
