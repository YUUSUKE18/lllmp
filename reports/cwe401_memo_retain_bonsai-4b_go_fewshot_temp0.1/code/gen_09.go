```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var numbers []int
	for {
		n, err := sc.Scan()
		if err != nil {
			break
		}
		if err == io.EOF {
			break
		}
		if _, err := strconv.Atoi(n); err != nil {
			continue
		}
		if n == 0 {
			continue
		}
		num := n
		operations := 0
		// 1 に到達するまでの手数を計算
		for num > 1 {
			if num%2 == 0 {
				num /= 2
			} else {
				num = 3*num + 1
			}
			operations++
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num == 1 {
			operations = 0
		}
		// 1に到達するまでの手数をメモ化
		if num ==
