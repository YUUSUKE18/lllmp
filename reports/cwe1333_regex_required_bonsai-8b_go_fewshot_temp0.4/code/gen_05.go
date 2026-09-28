package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var validLines int
	// カンマ区切りの正規表現：1個以上の数字列（0-9+）
	// 空行や空白行は無視
	// 最後にカムマは許容
	re := regexp.MustCompile(`^[\s]*([1-9]\d*)+([\s,]*)*([1-9]\d*)*([\s,]*)*$`)
	for {
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		sc.Shunt(n)
		if err == io.EOF {
			break
		}
		if re.MatchString(string(sc.Text())) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
