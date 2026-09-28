import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 空行をスキップ
            if (line.trim().isEmpty()) {
                continue;
            }
            
            // 前後の空白を削除して検証対象とする
            String trimmedLine = line.trim();
            
            // 数字とカンマ以外が含まれていないかチェック（文字コードで全角含む場合も NG と解釈するか、通常は半角英語のみ想定）
            // 仕様「数字とカンマ以外を含む行は妥当ではありません」→ 文字列が "012,34" のような形式であること
            boolean hasInvalidChar = false;
            for (char c : trimmedLine.toCharArray()) {
                if (!Character.isDigit(c) && c != ',') {
                    hasInvalidChar = true;
                    break;
                }
            }
            
            if (hasInvalidChar) {
                continue;
            }
            
            // 区切り点の存在チェック
            int commaCount = 0;
            for (int i = 0; i < trimmedLine.length(); i++) {
                if (trimmedLine.charAt(i) == ',') {
                    commaCount++;
                }
            }
            
            if (commaCount >= 1) {
                // 区切り点が存在する場合、数値の連続を判定
                // "0,123" -> OK, ",123" -> NG, "123," -> OK
                boolean isNumberStart = false;
                for (int i = 0; i < trimmedLine.length(); i++) {
                    if (trimmedLine.charAt(i) == ',') {
                        // カンマの直前に数字がない場合、NG
                        if (!isNumberStart) {
                            continue; 
                        }
                        isNumberStart = false; // カンマ後に数値開始
                    } else {
                        // 文字が数字か？
                        if (Character.isDigit(trimmedLine.charAt(i))) {
                            isNumberStart = true;
                        } else {
                            // 数字でもカンマでもないはずだが、入力チェックで除いているのでここは論理的には通じない
                            // ただし、先ほどの hasInvalidChar チェックで除かれているため安全
                            isNumberStart = false;
                        }
                    }
                }
                
                // 最終的に文字が数字に終わる必要があるか？ "123," は OK なので末尾カンマは OK
                // 上記のループでは、最後に数字があるかどうかは判断していない。
                // "123," の場合: i=0,1,2 で isNumberStart=true. i=3 で カンマ -> isNumberStart=false.
                // ループ終了. 条件を満たす。
                // ",123" の場合: i=0 で カンマ -> isNumberStart=false (NG).
                
                validCount++;
            } else {
                // カンマが 0 個の場合、数値のみで構成されているか？
                // 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
                // 末尾のカンマは許容。つまり "1,2," は OK。"1,2" は OK。"1" は NG（カンマ必須）。
                if (trimmedLine.isEmpty()) {
                    continue; // 空行は既にスキップ済み
                }
                
                // カンマが 0 個の場合、数値のみで構成されるか判定
                boolean allDigits = true;
                for (int i = 0; i < trimmedLine.length(); i++) {
                    if (!Character.isDigit(trimmedLine.charAt(i))) {
                        allDigits = false;
                        break;
                    }
                }
                
                if (allDigits) {
                    validCount++;
                }
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
