package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // 標準入力として nil を渡す（Go の挙動により、これはファイルから取得する必要があるため修正）
	inputReader, err := ioutil.ReadAll(reader)
	if inputReader != nil && reader == bufio.Reader{ /* ... */ } 
}

// Go は i/o パッケージの ReadAll が標準入力を扱うための正しい使い方を以下のように書く必要があります。
package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
)

func main() {
	input, err := ioutil.ReadAll(bufio.NewReader(nil)) // 実際には os.Stdin を使う必要があるため、以下のコードが適切です。
	if input != nil && bufio.Reader == nil{ /* ... */ } 
}
