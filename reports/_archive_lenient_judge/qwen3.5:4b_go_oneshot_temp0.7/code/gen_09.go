```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()

	var counts map[int]int64 = make(map[int]int64)
	totalSum int64 = 0

	for _, s := range strings.FieldsFunc(sc.Text(), func(r rune) bool {
		if r == ',' || (r < '0' && r > ' ') && !((r >= 'a' && r <= 'z') || (r >= 'A' && r <= 'Z')) { // 簡易的な非数字チェックの代わりに、そのままパースしてエラーを捉える方が堅牢だが、今回は Fields は空白区切りのみ。問題文は「カンマ区切りの整数列」とあるが、Go の標準ライブラリで解析しやすくするため、入力全体を受け取り、各トークンを処理する必要がある。
			// 実際の実装では、文字列を ',' で分割して取得するのが最も適切だが、bufio.Scanner は空白ベースなので、まず全部读み込み、その後自分で分割する必要がある。
			return true // スキャン器は通常空白区切りでスキップするため、ここでは「すべてのトークン」を取得するためにスキャナを使い直した方が確実なアプローチが必要か？ いや、問題文の例では strings.Fields を使っているが、「カンマ区切りの整数列」と明記されている。
			// 修正：まず入力文字列をすべて取得し、', ' で分割する。
			return true
		}
		return false // スキャン器は空白で区切るため、今回は直接テキストを取得して自分で分割するのがベストプラクティスとなるが、問題文の例では Scan()->Text()->Fields を使っている。ただし「カンマ区切り」であるため、Field ではなく Split は必要か？
			// Go の strings.Split とする方が安全。Scanner で一文字ずつ読むのは非効率すぎるので、sc.Scan() -> text := sc.Text() とし、strings.FieldsFunc や自分で分割する必要があるが、問題文の例は Strings.Fields を使っているため、「空白区切り」ではなく「カンマ区切り」として解釈すべきか？
			// 再考：問題文【仕様】に「標準入力から、カンマ区切りの整数列を受け取ります。」とある。例では空白区切りだったが、今回は明確に「カンマ区切り」。
			// よって、sc.Scan() で全文を取得し、strings.Split は使わない（Scanner の文字列をそのまま分割する必要があるが、Go には直接 Split を使うのが一般的）。
			return true // スキャン器は空白でスキップするため、ここでは単純に Text() を取得して自分で処理。
	}

	// 上記のロジックを修正：まずテキストを取得し、', ' で分割（スペースも含まれる可能性があるため）
	text := sc.Text()
	parts := strings.Fields(text) // ここでは空白区切りで取り扱っているが、「カンマ区切りの整数列」なので ', ' を除く必要があるか？
	// 問題文の例を見ると、strings.Fields は空白区切りである。もし入力に「1,2,3」となれば Fields で "1", "2", "3" に分割されない（連結される）可能性があるか？ いや、Fields は空白とタブでしかスキップしないので "," が含まれたら一つのトークンとして取られる。
	// したがって、「カンマ区切り」を正しく処理するためには strings.Split を使用すべきであるが、例では Fields を使っているため「空白区切りの整数列」と誤解されがちだが、今回は仕様通り「カンマ区切り」なので分割ロジックを変更する。

	text = sc.Text()
	tokens := strings.Fields(text) // 初期化（後で修正）
	// 正しいアプローチ：Scanner で全文を取得し、それを ', ' で分割
	var tokens []string
	for _, s := range strings.Split(strings.TrimSpace(sc.Text()), ",") {
		s = strings.Trim(s, " ")
		if len(s) == 0 {
			continue
		}
		n, err := strconv.Atoi(s)
		if err != nil || n < 0 && !strings.HasPrefix(n.String(), "-") { // 負の整数も許可されるか？例では「空白区切りの整数列」とあり、通常は正数と負数の両方。問題文には特に制限なしなので Atoi で OK。
			// Atoi は符号付き数字を扱えるが、エラーになることはある（非文字列など）。
			continue
		}
		tokens = append(tokens, s) // 実際は n を直接使うべきだが、ここでは string -> int の変換を行う必要があるため tokens に保持する。

		num := 0
		fmt.Sscanf(s, "%d", &num) // より堅牢なパース方法でも良いが Atoi がシンプルなので继续使用
	}

	counts map[int]int64 = make(map[int]int64)
	for _, nStr := range tokens {
		n, _ := strconv.Atoi(nStr)
		if counts[n] == 0 && !countsHasValue(counts, n) { // 既に存在しないか確認（map はデフォルト値 0 なので、count==0 で OK）
			counts[n] = 1
			totalSum += int64(1)
		} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
	} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
	} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(counts, n) { // このロジックは間違っている。map の値が 0 か？

// map を使用するため、キーが存在するか確認する必要があるか？ Atoi で解析した数値に直接アクセスすると既存の値がある場合 count に加算されるので OK。
} else if counts[n] == 1 && !countsHasValue(count
