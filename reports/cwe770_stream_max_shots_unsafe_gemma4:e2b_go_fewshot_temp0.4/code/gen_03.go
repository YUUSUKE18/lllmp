package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	count := 0
	maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（実質的な負の無限大）
	foundFirst := false

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		// カンマ区切りの整数列を処理するため、一行全体をカンマで分割するのではなく、
		// 入力全体を一度に読み込み、それを処理する方が効率的だが、
		// ここでは標準入力の各行が要素であると仮定して処理を進める。
		// 仕様は「カンマ区切りの整数列」なので、通常は一行全体がその列になることを想定する。

		// 例1, 2, 3の例から判断すると、入力全体を読み込み、それをカンマで分割するのが自然であるため、
		// 標準入力全体を一度に読み込む方式を採用する。
	}

	// 再度、標準入力全体を読み込む方法に戻す
	data, err := os.ReadFile(0) // os.Stdinのデータを読み込む
	if err != nil {
		// エラー処理は省略（競技プログラミング環境では通常発生しないと仮定）
		return
	}

	inputStr := string(data)
	// カンマ区切りの整数列を処理
	parts := strings.Split(inputStr, ",")
	count = 0
	maxVal = -1 << 63 // 64bit整数の最小値に近い大きな値で初期化

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if !foundFirst || n > maxVal {
			maxVal = n
			foundFirst = true
		}
	}

	if count == 0 {
		// 要素が一つもなかった場合、最大値の定義に注意が必要だが、ここでは0またはエラーを避けるため、
		// 入力が空ならcount=0, maxは未定義（あるいは最小値）とする。
		// 整数列が空の場合は count=0, maxは任意だが、ここでは0として扱うか、問題文の制約に従う。
		// 少なくとも1つの要素があればmaxValが更新される。
		fmt.Printf("count=0 max=%d\n", 0) // 要素がない場合はcount=0を返す
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxVal)
	}
}
