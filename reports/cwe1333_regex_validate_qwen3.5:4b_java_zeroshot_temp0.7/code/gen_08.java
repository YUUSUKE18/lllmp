import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = reader.readLine()) != null) {
            // 前後の空白を切り取り
            line = line.trim();
            
            // 空行は妥当ではない
            if (line.isEmpty()) {
                continue;
            }
            
            // 数値とカンマ以外が含まれていないかチェック（カンマ区切りの整数列のみ）
            // 正規表現を使用: ^\d+(,\s*\d+)*$ または ^(\s*\d+(\s*,\s*\d+)*)?$ のようなロジックで実装
            // より厳密に: 文字だけ '0'-'9', ',' が存在し、その間が空白のみで区切れるか確認
            
            boolean isValid = true;
            int length = line.length();
            
            if (length == 0) {
                continue; // 空行は処理済みだが、ここでは再度チェックとしてスキップ
            }
            
            // 文字の合法性をチェック
            for (int i = 0; i < length; i++) {
                char c = line.charAt(i);
                if (!Character.isDigit(c) && c != ',' && c != ' ') {
                    isValid = false;
                    break;
                }
            }
            
            if (!isValid) {
                continue;
            }
            
            // 正規化：空白を除去し、末尾のカンマを除く（論理的に同値にするため）
            // 仕様: "1 個以上の数字列がカンマで区切られて並んでいること"
            // 末尾のカンマは許容 -> ",," は連続してはいけないか？ "整数列" とは、空でない文字列。
            // なので ",," は "[]" が複数になるため非妥当。",0," は OK.
            
            String normalized = line.replaceAll("\\s+", ""); // 空白を全て除去
            
            // 正規表現で検証: ^(\d+)+[,]?$ または ^\d+(,\s*\d+)*$ のような形
            // 文字列が数字とカンマのみで構成され、カンマが有効な区切りであるか。
            // 空白を除去した後にチェックすると、'0,1,' は OK, '0,1,,2' は NG.
            
            if (normalized.isEmpty()) {
                continue; // 元の文字列は空または空白のみなら非妥当だが、ここでは空行以外なので処理済み
            }
            
            // 正規表現チェック: 数字とカンマのみで構成され、カンマが有効な区切りであること
            // ^\d+(,\d+)*$ は必須。末尾のカンマは許容 -> \d+(,\s*\d+)*,?$ のような形
            // ただし、空白を除去したので: \d+(,\d+)*[,]? となる。
            
            if (!normalized.matches("\\d+(,\\d+)*[,]?")) {
                continue;
            }
            
            validCount++;
        }
        
        System.out.println("valid=" + validCount);
    }
}
