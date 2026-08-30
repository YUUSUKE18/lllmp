package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	sum := int64(0)
	count := 0
	
	for scanner.Scan() {
		line := scanner.Text()
		
		// 空白無視して取得した文字列を分割する処理（例: "1,2,,3" -> ["", "", "", "1", "2", "", ""] など）
		fields := strings.Fields(line) // これはスペース区切りなので、カンマの扱いが必要
        
        // カンマ区切りの場合に対応するため再考
        parts := strings.Split(scanner.Text(), ",")
        
        uniqueValues := make(map[int64]bool)
		
    for _, s := range parts {
		s = strings.TrimSpace(s)
		if len(s) == 0 || !isInteger(s) {
			continue
		}
		val, err := strconv.ParseInt(s, 10, 64)
        if err != nil {
            continue
        }
        
        uniqueValues[val] = true
        
    for _, val := range vals; isInteger(val); i, ok:

    // カンマ区切り整数列を読み込むために、入力を再処理する	
	// スキャナは文字行を返すので、その中のカンマで分割したものを扱う
	lines := bufio.NewReader(os.Stdin)
	for {
			lineText, _ := lines.ReadString('\n')
            lineText = strings.TrimSpace(lineText)
            
        // 入力終了条件: 空または誤った形式の場合の再確認が必要
