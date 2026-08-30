import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を除去
            line = line.trim();
            
            // 空行は妥当ではない
            if (line.isEmpty()) {
                continue;
            }
            
            // 数字とカンマ以外が含まれていないかチェック
            boolean hasInvalidChar = false;
            for (char c : line.toCharArray()) {
                if (!Character.isDigit(c) && c != ',') {
                    hasInvalidChar = true;
                    break;
                }
            }
            
            if (hasInvalidChar) {
                continue;
            }
            
            // カンマ区切りの整数列として妥当か判定
            // 末尾のカンマは許容するため、カンマの数を数える必要がある
            int commaCount = 0;
            for (int i = 0; i < line.length(); i++) {
                if (line.charAt(i) == ',') {
                    commaCount++;
                }
            }
            
            // 1 個以上の数字列がカンマで区切られているためには、少なくとも 1 つのカンマが必要
            // ただし、末尾のカンマのみの場合（例："123,"）は妥当とされているため、
            // カンマの数 >= 1 であれば OK と判断する。
            // また、数字がない行も「数字列が並んでいる」条件を満たさないので、
            // 上記のチェックだけでは不十分。数値部分が存在するか確認する必要がある。
            
            // より厳密に：カンマで分割した各要素が整数（空白なし）であること
            String[] parts = line.split(",");
            
            boolean isAllIntegers = true;
            for (String part : parts) {
                if (part.isEmpty()) {
                    // 連続したカンマや末尾の空文字列は許容されるか？
                    // 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
                    // "1,2," -> ["1", "2", ""] -> "" は整数ではない。
                    // しかし、通常 split(",") で末尾のカンマを処理すると空文字列が出る。
                    // 仕様解釈：「数字とカンマ以外を含む行は妥当ではありません」とあるので、
                    // 空白以外の非数字文字は NG。空文字列自体は「数字とカンマ以外」ではないが、
                    // 「1 個以上の数字列」という条件に反するか？
                    // 通常、"1,2," は数値 "1", "2" が存在するので OK と解釈するのが自然。
                    // したがって、空文字列を無視して、残りの部分がすべて整数であるか確認。
                } else {
                    // 空白が含まれていないことを確認（trim 済みだが、内部に空白がないか）
                    // 仕様：「数字とカンマ以外を含む行は妥当ではありません」
                    // 空文字列は数字でもないが、カンマでもないので、
                    // 「数字列」としての要件を満たさない。
                    // しかし、"1,,2" はどう扱うか？
                    // 安全策として、分割後の各要素（空文字列を除く）が整数であるか確認。
                }
            }
            
            // より堅牢なアプローチ：カンマで区切った文字列を再構築し、空白なしで整数チェック
            // または、手動で解析
            boolean isValid = true;
            int i = 0;
            while (i < line.length()) {
                // 数字の開始
                if (!Character.isDigit(line.charAt(i))) {
                    isValid = false;
                    break;
                }
                
                // 数字の連続する部分を読み込む
                int j = i;
                while (j < line.length() && Character.isDigit(line.charAt(j))) {
                    j++;
                }
                
                // 数字列が存在したか？
                if (j <= i) {
                    isValid = false;
                    break;
                }
                
                // 数字列の終了位置をチェック
                // 次の文字がカンマか、末尾か
                if (j < line.length() && line.charAt(j) == ',') {
                    j++; // カンマをスキップ
                } else if (j >= line.length()) {
                    // 数値のみの場合も OK（"123"）
                } else {
                    // 数字の後に他の文字が来ている場合
                    isValid = false;
                    break;
                }
                
                i = j;
            }
            
            if (isValid) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
