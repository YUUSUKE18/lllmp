package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	lines := 0
	valid := false

	re := regexp.MustCompile(`^\s*[,0-9\s]+,\s*[0-9]+(?:\s*,[0-9]+)*?\s*$`)

	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行はスキップ（ただし問題文の「空行...妥当ではありません」を注意：空行自体が「1 個以上の数字列」を満たさないので妥当とはみなせない。出力ではカウントしないのが自然だが、厳密に「妥当かどうかを判定する」なら空行は false。しかし例のように処理するなら、空行を通すか通さず。問題文「空行...妥当ではありません」とあるので、count に含めない）
			continue
		}

		// 正規表現でマッチ
		if re.MatchString(line) {
			valid = true
			lines++
		}
	}

	fmt.Printf("valid=%d\n", lines)
}
