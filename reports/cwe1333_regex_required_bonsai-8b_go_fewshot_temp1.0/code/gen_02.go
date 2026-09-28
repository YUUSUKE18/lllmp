package main

import (
	"bufio"
	"fmt"
	"os"
	regexp"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	valid := 0
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		s := strings.TrimSpace(buf[:n])
		if s == "" {
			continue
		}
		// [0-9,], [0-9,], ... という形で、1以上の数字列があるかを検査
		re := regexp.MustCompile(`([0-9]+(?:,[0-9]+)*)(?=\n|$))`)
		matches := re.FindAllStringSubmatch(s)
		if len(matches) >= 2 {
			valid++
		}
	}
	fmt.Printf("valid=%d\n", valid)
}
