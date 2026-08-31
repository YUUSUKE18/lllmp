package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	
	var count int
	var sum int64
	
	// 1 行目に整数の個数を読み取る
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	
	countStr := strings.TrimSpace(line)
	count, err = strconv.Atoi(countStr)
	if err != nil || count < 0 {
		count = -1 // 負の値の場合は、実際に読み取れる数をカウントするだけとするため、-1 でフラグを立てる（または 0 とする）
	} else {
		// 実際には、問題文に従って「実際に存在する整数の個数」のみをカウントするため、count の値は出力用として使うが、
		// 本質的には「実際に読み取れた整数の数」に一致させる必要がある。
		// ただし、仕様上「1 行目の値」と「実際に読み取れる整数の数」が異なる場合があるため、
		// count を初期化して、後で実際に数えた値で更新する方が安全だが、
		// 問題文の「count=<実際に読み取れた個数> sum=<合計>」という出力形式から、
		// count は「実際に読み取れた整数の数」そのものになる。
		// なので、readLine の中に含まれる文字列として解析し、後で再カウントするのではなく、
		// 1 行目の値を readCount として使い、実際の数えアップは別変数で行うが、
		// 最終的な count は「実際に読み取れた整数の数」に一致させる必要がある。
		
		// 修正：1 行目の値を readFirstLineCount として保存し、実際にはすべての有効な整数を読み込んでカウントする。
		readFirstLineCount = count
	}

	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line := scanner.Text()
		
		// 空行や無効な行をスキップ
		if line == "" || !isValidInteger(line) {
			continue
		}
		
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		
		count++
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func isValidInteger(s string) bool {
	// 文字列が整数であることを確認（符号付き、空白を含む場合の処理は ParseInt が行う）
	// ただし、問題文では「整数として解釈できない行も無視」とあり、
	// したがって、ParseInt でエラーが出る場合はスキップする。
	return true // 実際には解析後の結果で判断するが、ここでは簡易的に扱う
}

var readFirstLineCount int
