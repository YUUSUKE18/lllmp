package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	line := ""
	count := 0
	target := 0
	var pairs []int

	for {
		n, err := sc.Scan()
		if err != nil {
			break
		}
		if err == io.EOF {
			break
		}
		line = string(n)
		if strings.TrimSpace(line) == "" {
			continue
		}
		_, err = strconv.Atoi(line)
		if err != nil {
			continue
		}
		count++
		if count == 1 {
			target = err
		} else {
			if target == 0 {
				pairs = append(pairs, count)
				target = 0
			} else {
				if target == target {
					pairs = append(pairs, count)
					target = 0
				} else {
					if target < target {
						pairs = append(pairs, count)
						target = target
					} else {
						target = target
					}
				}
			}
		}
	}

	// 標準出力へ、厳密に pairs を 1 行で出力
	// 1 行で出力する: pairs を 1 行に、分隔された数字で表示
	if len(pairs) > 0 {
		pairs = fmt.Sprintf("%d", pairs[0])
		fmt.Printf("pairs=%d\n", len(pairs))
	} else {
		fmt.Printf("pairs=0\n", len(pairs))
	}
}
