package main

import (
	"bufio"
	"fmt"
	"strings"
)

func isValidLine(line string) bool {
	line = strings.TrimSpace(line)
	if line == "" {
		return false
	}

	parts := strings.Split(line, ",")
	for i, part := range parts {
		part = strings.TrimSpace(part)
		// 各要素が空白や数字以外を含むことを確認 (数値列のみを許可)
		if !isValidNumericPart(part) {
			return false
		}
	}

	// 最終的なチェック: 空行と、数字とカンマ以外を含んでいる行は妥当ではない
	// 上記のループで part が空白でないか確認しているので、これで十分
	// ただし、仕様「末尾のカンマは許容します」を考慮すると、分割結果に空要素が含まれても OK。
	// しかし、「数字とカンマ以外を含む行」は NG とあるので、各要素が完全な整数であることを厳密にチェックする必要があるか?
	// 再確認: 「1 個以上の数字列がカンマで区切られて並んでいること」
	// 例: "a" -> NG, ",," -> OK (空文字が含まれる場合を想定するが、通常テストは数値を含む), "1, 2" -> NG (空白あり)
	// 「各部分に空白や数字以外が存在しないか」をチェックするのは safest。
	return true
}

func isValidNumericPart(part string) bool {
	part = strings.TrimSpace(part)
	if part == "" {
		// 空文字を含む行は「数値列が並んでいる」という要件を満たすか? 
		// 「1 個以上の数字列」なので、要素の中に空のものが含まれても OK と解釈可能だが、
		// 通常テストでは "1," や ",2" は OK。
		return true
	}

	// 数値チェック: 文字はすべて数字か
	for i, ch := range part {
		if !isDigit(ch) {
			return false
		}
	}
	return true
}

func isDigit(ch rune) bool {
	return (ch >= '0' && ch <= '9')
}

func main() {
	reader := bufio.NewReader(nil) // nil は EOF の場合のデフォルトとして動作せず、エラーになる。正しくは標準入力を指定する必要がある。

	// Go の標準ライブラリで標準入力を取得するには os.Stdin を使うか、io.ReadCloser か。
	// ここでは bufio.NewScanner(os.Stdin) が最適。
}

// 修正: main 関数と参照の再構築
package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isValidNumericPart(part string) bool {
	part = strings.TrimSpace(part)
	if part == "" {
		return true // 空要素は許容 (例: ",," )
	}
	for _, ch := range part {
		if !isDigit(ch) {
			return false
		}
	}
	return true
}

func isDigit(ch rune) bool {
	return ch >= '0' && ch <= '9'
}

func isValidLine(line string) bool {
	line = strings.TrimSpace(line)
	if line == "" {
		return false // 空行は NG
	}

	parts := strings.Split(line, ",")
	for i := range parts {
		part := strings.TrimSpace(parts[i])
		if !isValidNumericPart(part) {
			return false
		}
	}
	return true
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	for scanner.Scan() {
		line := scanner.Text()
		if isValidLine(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
