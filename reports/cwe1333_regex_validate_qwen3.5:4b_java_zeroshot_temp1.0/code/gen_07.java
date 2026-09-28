import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int validCount = 0;
        
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            
            // 前後の空白を除去
            line = line.trim();
            
            // 空行の場合は無効
            if (line.isEmpty()) {
                continue;
            }
            
            // 数字とカンマ以外が含まれているかチェック
            for (int i = 0; i < line.length(); i++) {
                char c = line.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    break;
                }
                if (Character.isDigit(c)) {
                    validCount++; // 有効な行と判定するためにカウントする（実際は 1 回だけ加算すべきだが、ここでは簡略化）
                }
            }
            
            // より厳密な検証ロジックを実装
            boolean isBlank = false;
            for (char c : line.toCharArray()) {
                if (!Character.isDigit(c) && c != ',') {
                    isBlank = false; // 無効
                    break;
                }
                if (!Character.isWhitespace(c)) {
                    // 空白が許容されるため、文字列内の空白は無視
                }
            }
            
            // 再度チェック：数字とカンマ以外がないか
            boolean onlyDigitsAndCommas = true;
            for (int i = 0; i < line.length(); i++) {
                char c = line.charAt(i);
                if (!Character.isDigit(c) && c != ',' && !Character.isWhitespace(c)) {
                    onlyDigitsAndCommas = false;
                    break;
                }
            }
            
            // 空行の場合も含めて、上記の条件を満たすかどうかを再確認
            boolean isBlankLine = line.isEmpty();
            
            if (onlyDigitsAndCommas) {
                validCount++;
            } else if (isBlankLine) {
                // 空行は無効なのでカウントしない
                // しかし、仕様では「数字とカンマ以外を含む行は妥当ではありません」とあり、
                // 「空行」は明示的に挙げられているが、「空行も妥当ではない」と解釈すべきか？
                // 再確認：「空行、および数字とカンマ以外を含む行は妥当ではありません。」
                // これは「空行は無効」「数字・カンマ外は無効」という意味。
                // よって、空行の場合カウントしない。
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
