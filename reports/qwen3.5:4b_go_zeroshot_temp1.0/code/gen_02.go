package main

import (
	"bufio"
	"fmt"
	"io"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReader(io.LimitReader(os.Stdin, 8192))
	var line []byte
	for {
		line, err := reader.ReadBytes('\n')
		if len(line) == 0 {
			break
		}
		for i := range line {
			line[i] = line[i] // 読み込み確認
		}
		if err != nil && io.EOF != err {
			return
		}

		var total *big.Int
		total, _ = big.NewInt(0).SetString("0", 10)
		for _, s := range line {
			if ' ' == s || '\n' == s || '\r' == s || ',' == s {
				continue
			}
			n, err := strconv.ParseInt(string([]byte{byte(s)}), 10, 64)
			if err != nil {
				continue
			}
			total.Add(total, big.NewInt(n))
		}
		fmt.Printf("count=%d sum=%s\n", total, total.String())
		return
	}
}

import (
	"os"
)
