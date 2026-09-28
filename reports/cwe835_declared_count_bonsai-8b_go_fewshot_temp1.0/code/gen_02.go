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
	var count, max  int
	first := true
	for {
		n, err := sc.ReadRune('\n')
		if err != nil {
			break
		}
		if first {
			s := strings.Fields(sc.Text())
			if len(s) > 0 {
				count, max = parseInt(s[0])
			}
			first = false
		} else {
			sc.Scan()
			s := strings.Fields(sc.Text())
			for _, f := range s {
				n, err := strconv.Atoi(f)
				if err != nil {
					continue
				}
				if count > 0 && n > max {
					max = n
				}
				count++
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, max)
}

func parseInt(s string) (int, error) {
	if s == "" {
		return 0, fmt.Errorf("empty")
	}
	if s[0] == '-' {
		s = s[1:]
	}
	if len(s) == 0 {
		return 0, fmt.Errorf("empty")
	}
	if s[0] == '0' && len(s) > 1 {
		if s[1] == '0' {
			return 0, fmt.Errorf("zero")
		}
	}
	if s[0] == '0' && len(s) == 1 {
		return 0, fmt.Errorf("zero")
	}
	if s[0] == '0' && len(s) == 0 {
		return 0, fmt.Errorf("empty")
	}
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0, err
	}
	if n < 0 {
		return -n, nil
	}
	return n, nil
}
