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
	for {
		n, err := sc.Read('\n')
		if err != nil {
			break
		}
		sc.Shunt(n, err)
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		// ルール: 1 個以上の数字列がカンマで区切られており、末尾のカンマは許容
		re := regexp.MustCompile(`^([0-9]+(?:,[0-9]+)*)(?:$|,)$`)
		if re.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
