package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil は EOF を返すため空入力に対応するが、実際には標準入力を指定すべきだが仕様通り「標準入力から」なので os.Stdin が必要。修正:
}
