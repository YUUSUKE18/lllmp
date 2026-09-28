import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 前後の空白を除去し、空行の場合はスキップ（ただし問題文では「空行...は妥当ではありません」とありますが、通常は空行は無視するか判定対象外とするが、ここでは文字列として処理する）
            // 仕様：「空行...は妥当ではありません」→ 空文字列は含まないため validCount にカウントしない
            if (line.trim().isEmpty()) {
                continue; 
            }

            String trimmed = line.trim();
            
            // 数字とカンマ以外が含まれていないかチェック
            boolean hasInvalidChar = false;
            for (int i = 0; i < trimmed.length(); i++) {
                char c = trimmed.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    hasInvalidChar = true;
                    break;
                }
            }
            
            if (hasInvalidChar) {
                continue;
            }

            // 有効な形式かどうかチェック
            // 1 個以上の数字列がカンマで区切られて並んでいること
            // 末尾のカンマは許容する
            
            int commaCount = 0;
            for (int i = 0; i < trimmed.length(); i++) {
                if (trimmed.charAt(i) == ',') {
                    commaCount++;
                }
            }

            // 少なくとも 1 つの数字列が必要 → カンマが 0 個でも OK（例："123"）
            // しかし、数字列がない場合は無効。ただし、上記チェックでは「数字とカンマ以外のみ」なので、
            // "123" は有効、「,,」は無効（数字列がない）。
            
            boolean hasNumber = false;
            int prevEnd = 0;
            for (int i = 0; i < trimmed.length(); i++) {
                if (trimmed.charAt(i) == ',') {
                    // カンマの直前に数字があるか確認
                    if (i > 0 && Character.isDigit(trimmed.charAt(i - 1))) {
                        hasNumber = true;
                    } else {
                        // カンマが最初の位置にある場合、または前の文字が数字ではない場合 → 無効
                        // ただし、仕様は「1 個以上の数字列がカンマで区切られて並んでいる」
                        // つまり、少なくとも 1 つの数字列が存在し、それがカンマで区切られている必要がある
                        // "abc" は上記チェックで通過するが、数字がないので無効。
                        // ",,," は上記チェックで通過するが、数字がないので無効。
                        // "123,,456" は OK。
                    }
                } else if (Character.isDigit(trimmed.charAt(i))) {
                    hasNumber = true;
                }
            }

            if (!hasNumber) {
                continue;
            }

            // さらに厳密にチェック：数字列がカンマで区切られているか
            // 例："123" → OK
            // 例："123,456" → OK
            // 例："123,,456" → OK（連続したカンマは許容される？仕様「数字列がカンマで区切られて並んでいる」）
            // 通常、空の数字列を許さない。つまり "123,,456" は "123" と "" と "456" のように解釈され、空の数字列が含まれるので無効か？
            // 再考：「1 個以上の数字列がカンマで区切られて並んでいる」
            // 意味は、文字列が [数字列][カンマ][数字列]... の形で構成されていること。
            // つまり、カンマの前後に必ず数字がある必要がある（最初の数字列と最後の数字列は端まで）。
            
            // 再確認：仕様「末尾のカンマは許容します」→ "123," は OK。
            // しかし、"123,,456" は "123", "", "456" のように空の数字列が含まれるので無効か？
            // 通常、この種の仕様では「連続したカンマは許さない」と解釈される。
            // また、「数字とカンマ以外を含む行は妥当ではありません」→ 文字のみが OK。
            
            // より厳密な解析：
            // 文字列を分割し、すべての要素が空でない数字列であるか確認。
            // ただし、末尾のカンマは許容 → 分割時に空の要素が生じないよう処理が必要。
            
            String[] parts = trimmed.split(",");
            
            // split は末尾のカンマでも空要素を生成しない（デフォルト）
            // "123," → ["123"]
            // "123,456" → ["123", "456"]
            // "123,,456" → ["123", "", "456"] → "" が含まれるので無効
            
            for (String part : parts) {
                if (part.isEmpty()) {
                    continue; 
                }
                // 文字列が数字のみであるか確認
                boolean isNumberOnly = true;
                for (int j = 0; j < part.length(); j++) {
                    char c = part.charAt(j);
                    if (!Character.isDigit(c)) {
                        isNumberOnly = false;
                        break;
                    }
                }
                if (!isNumberOnly) {
                    continue; 
                }
            }

            // 上記ループで、空要素をスキップしているので "123,,456" は通過してしまう。
            // 修正：連続したカンマは許さない → 文字列に「,,」が含まれていないか確認
            if (trimmed.contains(",,")) {
                continue;
            }

            validCount++;
        }
        
        System.out.println("valid=" + validCount);
    }
}
