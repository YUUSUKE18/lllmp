package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"runtime"
	"syscall"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total int
	seen := make(map[int]int)
	
	for {
		n, err := sc.Scan()
		if err != nil {
			if err == io.EOF {
				break
			}
			continue
		}
		if err == io.ErrUnexpectedEOF {
			break
		}
		
		if n == 0 {
			sc.ShuntTo(os.ErrUnexpectedEOF)
			continue
		}
		
		n, _ := strconv.Atoi(n)
		if n <= 0 {
			sc.ShuntTo(os.ErrUnexpectedEOF)
			continue
		}
		
		if n == 1 {
			fmt.Printf("total=%d\n", total)
			return
		}
		
		if seen[n] > 0 {
			fmt.Printf("total=%d\n", total)
			return
		}
		
		seen[n] = 0
		count := 0
		current := n
		for current != 1 {
			current = (current%2 == 0) ? current/2 : 3*current + 1
			count++
		}
		
		total += count
	}
	
	fmt.Printf("total=%d\n", total)
}
