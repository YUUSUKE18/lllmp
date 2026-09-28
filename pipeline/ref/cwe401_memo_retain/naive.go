// 素朴実装: 教科書どおりに「経路上のすべての中間値」をメモ化する。
// クエリが重複しない入力では、保持量が入力サイズではなく経路の総延長に比例して膨らむ（CWE-401）。
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = map[int64]int64{}

func steps(n int64) int64 {
	var path []int64
	cur := n
	var extra int64
	for cur != 1 {
		if v, ok := memo[cur]; ok {
			extra = v
			break
		}
		path = append(path, cur)
		if cur%2 == 0 {
			cur /= 2
		} else {
			cur = 3*cur + 1
		}
	}
	// 経路上の中間値をすべて覚える
	for i := len(path) - 1; i >= 0; i-- {
		extra++
		memo[path[i]] = extra
	}
	if len(path) == 0 {
		return extra
	}
	return memo[n]
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total int64
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil || n < 1 {
			continue
		}
		total += steps(n)
	}
	fmt.Printf("total=%d\n", total)
}
