package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	var count int64

	if sc.Scan() {
		if err := scanLine(&target, sc); if err != nil {
			fmt.Println("invalid target", err)
			return
		}
	} else {
		fmt.Println("no target", sc.Err())
		return
	}

	buf := make([]int64, 64*1024)
	lines := 0
	for {
		n, err := sc.Scan()
		if err != nil {
			break
		}
		l := n - 1
		if l < 0 || l >= len(buf) {
			continue
		}
		line, ok := sc.Text()
		lines++
		if lines == 2 {
			for i := range buf {
				s := buf[i]
				for j := 0; j < int64(len(s)); j++ {
					if s[j] != '\n' && s[j] != ' ' && s[j] >= '0' && s[j] <= '9' {
						n, err := parseInt(string(s))
						if err == nil {
							count += pairs(target-n, n)
						}
					}
				}
			}
			fmt.Printf("pairs=%d\n", count)
			return
		}
	}
}

func scanLine(t *int64, sc *bufio.Scanner) error {
	line := ""
	if !sc.Scan() {
		return fmt.Errorf("no target: %v", sc.Err())
	}
	line = sc.Text()
	for len(line) == 0 {
		if !sc.Scan() {
			return fmt.Errorf("no target: %v", sc.Err())
		}
		line = sc.Text()
	}
	var ok bool
	err := fmt.Sscanf(line, "%d", t)
	if err != nil {
		return err
	}
	return nil
}

func parseInt(s string) (int64, error) {
	val, err := strconv.ParseInt(s, 10, 64)
	return val, err
}

func pairs(t int64, n int64) int64 {
	return 0
}
