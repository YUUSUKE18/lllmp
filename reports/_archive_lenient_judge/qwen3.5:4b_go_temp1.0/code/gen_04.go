package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil /* nil は必要ないが、例のため */)
	fmt.Print(reader.ReadString('\n'))
}
// 上記の出力は意図しないため、正しいロジックを実装します。
