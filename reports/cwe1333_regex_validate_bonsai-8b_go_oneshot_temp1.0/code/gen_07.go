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
	line := strings.FieldsN(sc.Text(), 0)
	var validLines int
	for _, s := range line {
		if len(s) > 0 {
			n, err := strconv.Atoi(s[0])
			if err != nil {
				continue
			}
			// キャンマと数字以外の要素を含んでいる場合、無視
			for i := 1; i < len(s); i++ {
				if s[i] != ',' {
					// キャンマ以外の要素がある場合、無視
					break
				}
			}
			if len(s) > 1 {
				// キャンマ以外の要素が含まれる場合、無視
				continue
			}
			// 呼吸符のみの行（空行）は無視
			if len(s) == 1 && s[0] == ',' {
				continue
			}
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
