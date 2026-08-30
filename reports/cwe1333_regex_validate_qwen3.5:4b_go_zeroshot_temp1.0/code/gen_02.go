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
	validCount := 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は妥当とみなさないが、出力条件より単に処理をスキップ
		}
		
		// 数値リストを有効な整数のリストに変換してパースする
		fields := strings.Split(line, ",")
		valid := true
		
		for _, field := range fields {
			field = strings.TrimSpace(field)
			if field == "" {
				continue // エリアなしの場合は、この文脈では無効とみなす
			}
			
			n, err := strconv.Atoi(field)
			if err != nil || n != int(n) {
				valid = false
				break
			}
		}
		
		if valid {
			// 数字列のみを含む行、あるいは末尾カンマのみの行は有効
			fmt.Println("valid=" + strconv.Itoa(validCount))
			validCount++
		}
	}

	fmt.Println("total=" + strconv.Itoa(validCount))
}
