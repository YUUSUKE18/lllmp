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
	if !sc.Scan() {
		return
	}
	input := sc.Text()
	pairs := make(map[int]int64)
	for _, s := range strings.FieldsFunc(input, func(r rune) bool {
		return r == ',' || (r >= '0' && r <= '9')
	}) {
		if len(s) > 1 {
			n, err := strconv.Atoi(strings.TrimSuffix(s, ","))
			if err != nil {
				continue
			}
			pairs[n]++
		} else if s == "" || strings.TrimSpace(s) == "" {
			continue
		}

		for _, r := range []rune{s[0]} {
			switch r {
			case ' ', '\t', ',', '-':
				if !strings.HasPrefix(strings.TrimPrefix(s, "-"), " ") && s != "-" {
					break
				}
			default:
				continue
			}
		}

		for _, c := range []rune{s[0]} {
			switch c {
			case ' ', '\t', ',', '-':
				if !strings.HasPrefix(strings.TrimPrefix(s, "-"), " ") && s != "-" {
					break
				}
			default:
				continue
			}

			n, err := strconv.Atoi(strings.TrimSpace(s))
			if err == nil {
				pairs[n]++
			}
		}
	}

	sum := int64(0)
	for n, count := range pairs {
		sum += int64(n*count)
	}

	fmt.Printf("count=%d sum=%d\n", len(pairs), sum)
}
