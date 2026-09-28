import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (isInvalid(line)) {
                continue; // 妥当でない行はスキップ
            }
            validCount++;
        }
        
        System.out.println("valid=" + validCount);
    }
    
    private static boolean isInvalid(String line) {
        String trimmed = line.trim();
        
        // 空行の場合
        if (trimmed.isEmpty()) {
            return true;
        }
        
        // 数字とカンマ以外が含まれているかチェックするために、正規表現を使用する。
        // ^: 開始位置 $: 終了位置
        // [\s,0-9]+: 空白（区切り用）または数字（内容用）のみ
        if (!trimmed.matches("[\\s0-9]+")) {
            return true;
        }
        
        // 正規表現で「カンマ区切りの整数列」か確認する。
        // ここでは「1 個以上の数字列がカンマで区切られて並んでいる」が要件なので、
        // [\s,0-9]+ に一致しても、例えば "    123" という空白だけで始まる文字列は、
        // 「数字列とカンマの区切りなし」であり「妥当でない」と解釈する必要があります。
        // 正確な判定式: 行全体が "^[ \t]*([0-9]+(,[ \t]*[0-9]+)*)"でなければならない（空白のみを除く意味での厳密性）
        // ただし、末尾のカンマは許容されるので ",[ \t]*$"も含まれる。
        
        // 再考: "空白区切り"ではなく"カンマ区切り"の整数列。
        // 条件: 1 個以上の数字列がカンマで区切られて並んでいる。
        // 例: "1,2", "3,," (末尾のカンマのみなら OK? 問題文: '1 個以上の数字列' とあるので、カンマだけでは数字はないので NO)
        // 例: "1,2,", "1", "" -> ""はNo. " "はNo.
        
        // より厳密な判定ロジック:
        // 1. 行の前後空白を削除。空なら無効。
        // 2. 残った文字が全て数字またはカンマでなければ、無効。
        // 3. カンマが存在しない場合、数字列は存在する必要があるが、文字列として有効か確認が必要。
        //    (例: "1" は OK, ",," は No)
        // 4. 数字とカンマの間隔や位置が適切か。
        
        if (!trimmed.matches("^[0-9]+(,[0-9]+)*$") && !trimmed.matches("^[0-9]+(,[0-9]+)*[,]?$")) {
             // "1,2," のパターン: ^[0-9]+(,[0-9]+)*,$
             // しかし、上記の regex は末尾のカンマを含みませんでした。問題文「末尾のカンマは許容します」なので、追加する。
             return true; 
        }
        
        // 上記の regex 改善:
        //パターン1: ^[0-9]+(,[0-9]+)*$ (数字のみ)
        //パターン2: ^[0-9]+(,[0-9]+)*,$ (末尾カンマあり)
        if (!trimmed.matches("^[0-9]+(,[0-9]+)*($|,)")) {
            return true;
        }

        return false;
    }
}
