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

	input := sc.Text()
	fields := strings.Fields(input) // カンマ区切りではなく、空白区切りの文字列を処理するが、問題文は「カンマ区切りの整数列」とある。しかし例では Strings.Fields を使っているため、入力形式に合わせて調整が必要か？  
	// 再考：仕様は「カンマ区切りの整数列」だが、Go の標準ライブラリで容易に解析するには Split(",") が適切。
	// ただし、「空要素・前後の空白は無視」とあるので、Split は必要ないが、入力例によってはカンマが含まれている可能性がある。  
	// 安全策として、まずカンマを区切り文字とみなし、各部分から整数を抽出する処理を行う。

	count := 0
	maxVal := int64(0) // 初期値は最小値より大きいように設定が必要だが、要素がない場合は count=0, max=0 と出力  
	// 問題文では「最大値」を求めるが、空の場合の挙動未定。例1 では max=0 が返っているため、同様に扱う。

	parts := strings.Split(input, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part) // カンマで分割後の各要素に空白がある場合も考慮
		if len(part) == 0 {
			continue
		}
		
		n, err := strconv.Atoi(part)
		if err != nil || n < int64(1e38)-1 || n > int64(1e39)+1 { // 64bit integer の範囲をチェック（実際には Go の int64 は -2^63〜2^63-1）  
			continue
		}

		count++
		if count == 0 || maxVal < n {
			maxVal = int64(n)
		} else if maxVal > n {
			// 既に最大値より大きい場合は更新しない（ただし、最初の要素で初期化されるため）
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
