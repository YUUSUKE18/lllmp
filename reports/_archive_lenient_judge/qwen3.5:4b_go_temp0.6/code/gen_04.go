package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReaderStdin()

	var bigIntegers []*big.Int // 重複を除いた整数のリスト
	counts := make(map[*big]int) // 各整数が出現する回数（map キーをポインタで管理）

	for line, err := reader.ReadString('\n'); err == nil; line = reader.ReadString('\n') {
		line = string(line)[:len(line)-1] //末尾の改行を取り除く
		
		if len(line) > 0 && (line[0] >= '0' || line[len(line)-1] <= '9' || 
		 ((len(line) == 2 && line[:1] != " ") && line[len(line-1:]) != " ")) {
			
			fmt.Fprintln(reader, fmt.Sprintf("%d", len(counts)))
		}

		if counts[&bigIntegers[i]] > 0 {
			count := int64(*counts) + 1 //重複を除いた整数の個数と合計を求める。

			return
		}
		
		fmt.Fprintf(reader, "%d", i+1)
	}
	
	fmt.Fprintln(fmt.Sprint(counts))
}
