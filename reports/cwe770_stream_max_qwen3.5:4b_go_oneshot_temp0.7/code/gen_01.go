package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10))
		return
	}

	text := sc.Text()
	tokens := strings.Fields(text) // " , " を区切り文字にして空要素を除去する (後述の処理で補完可能だが、Fields は空白連続と両端もスキップするため安全)

	count := 0
	maxVal := int64(0)	// デフォルト値は 0。ただし負数がある場合は最大値が負になる可能性があるため、最初の要素で初期化すべきか考慮する必要がある。しかし問題文では「整数列」とあり、「空要素・前後の空白は無視し」とある。
					// もし入力がない場合 count=0, max=? と決める必要があるか？例1 では max=0 がデフォルト値になっているが、負数が入力されない限り 0 は安全な初期値かもしれない。
					// しかし、「最大値」を求めるとあるので、空配列の場合の挙動は指定されていない。例1 の max:=0 を踏襲する。

	for _, f := range tokens {
		n, err := strconv.ParseInt(f, 10, 64)
		if err != nil {
			continue // 整数として解釈できない要素は無視
		}
		count++
		// maxVal を更新: もし count が 0 のときは n に設定する (例1 でも first フラグを使うようだが、ここでは簡略化して初回のみ設定)
		if count == 1 {
			maxVal = n
		} else if n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
