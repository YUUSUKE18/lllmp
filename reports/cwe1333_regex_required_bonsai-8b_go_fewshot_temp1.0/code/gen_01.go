package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var validLines int
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		// 行の前後の空白を無視
		s := strings.TrimSpace(buf[:n])
		// 正規表現で「カンマ区切りの整数列」を検出
		if re.MatchString(s, "[+-]?\\d+\\d*([\\s\\n]*[+-]?\\d+\\d*))*") {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
