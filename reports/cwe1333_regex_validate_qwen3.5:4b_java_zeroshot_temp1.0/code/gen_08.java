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
            // 前後の空白を除去した文字列を作成 (正規化)
            String normalizedLine = line.trim();
            
            // 空行の場合: 妥当でない
            if (normalizedLine.isEmpty()) {
                continue;
            }
            
            // 文字列をカンマで区切り、各部分のチェックを行う
            // StringTokenizer を使って「数字」、「空白」、「カンマ」を区別してチェックする必要がある。
            // しかし、仕様は「1 個以上の数字列がカンマで区切られて並んでいること」である。
            // つまり、「A, B, C」は OK 「ABC」も OK (末尾カンマ含む許容) 「,,」は NG 「a,b」は NG
            
            // 正規化された文字列から「数値」と「カンマ」の組み合わせのみを構成できるか判定する。
            boolean isValid = true;
            int lastIndex = -1;
            
            // 文字列をスキャンして有効なパターンかどうかをチェック
            for (int i = 0; i < normalizedLine.length(); i++) {
                char c = normalizedLine.charAt(i);
                
                // 空白の扱い: "行の前後の空白は無視します" とありますが、
                // 内部の空白は区切り文字として機能するか？通常「カンマ区切りの整数列」という文脈では、
                // 内部の空白は数値の一部ではないためエラーか、あるいは区切りとして扱う。
                // 最も厳密に「数字」だけを集めるなら、空白は無視して数字を探す必要がある。
                // しかし、"1 , 2" のような場合は？仕様は「カンマで区切られていること」。
                // 一般的にプログラミングコンテストにおいて「整数列」というと連結した文字列か区切り文字のみを含むことが多い。
                // ここでは「数値文字（0-9）のみ」が必須であるとするより良い解釈が必要。
                // 「1,2」は OK. 「1 ,2」は NG (空白が存在). あるいは「1, 2」も OK?
                // 「行の前後の空白は無視します」と言っており、内部の空白は無視されていないため、
                // 正規表現や厳密な文字チェックをするのが安全。
                // 条件: 文字列は '{数字}},{数字}...,{数字}? または {数字},{数字}...{数字}' の形。(末尾カンマ許容)
                // しかし「1,2」の場合は空白がないが、「1 , 2」は空白がある。
                // もし「1, 2」が OK とするなら、空白を無視してチェックする必要があります。
                // ただし、「数値とカンマ以外を含む行は妥当ではない」とあるから、空白は除外すべきか？
                // 「数字とカンマ以外」とあるので空白も「その他」に該当しダメ？
                // しかし「前後の空白は無視」とあるので、空列ではなくて内部に空白があればダメとするのが一般的です。
                // 例: "1,2" -> OK. "1 ,2" -> NG (空白あり).
                
                if (!isDigit(c)) {
                    isValid = false;
                    break;
                }
            }
            
            // さらに、カンマの位置と数字の連続性を確認する必要がある。
            // もし上記で OK の場合でも、「,,」のような無駄なカンマは？「1,2」なら OK.
            // 「1,2,3」も OK.
            // 空白の有無を確認するため、各文字を再処理して数式として判定する必要がある。
            
            if (isValid) {
                String checkStr = normalizedLine;
                // カンマと数字のみが許容されるか確認
                for (int i = 0; i < checkStr.length(); i++) {
                    char c = checkStr.charAt(i);
                    if (!Character.isDigit(c) && c != ',') {
                        isValid = false;
                        break;
                    }
                }
                
                // 数字列とカンマが正しい組み合わせか確認
                // 例: "1,2" -> 数字 '1', カンマ ',', 数字 '2' (OK)
                //      "1,," -> NG (連続したカンマは許容されないのか？仕様未明だが「数字列」が並んでいるなら NG)
                //      例: "1,,2" は数値列が "1" と "," と "," と "2" となるので NG.
                
                if (isValid) {
                    String[] parts = checkStr.split(","); // カンマで区切る
                    boolean hasNumberSequence = false; // 何らかの数字が含まれているか
                    
                    for (String part : parts) {
                        part = part.trim(); // 各要素内の空白も無視？「行の前後の空白」というのは全体の話だが、厳密に扱うなら trim.
                        if (!part.isEmpty() && Character.isDigit(part.charAt(0)) || part.length() == 0) {
                            // 文字列が空の場合（余分なカンマ）は許容されるか？
                            // "1,," -> split(",") => ["1", "", ""] -> "" は NG.
                            // したがって、非空白でない部分のみが数字である必要がある。
                            
                            if (!part.isEmpty()) {
                                if (!Character.isDigit(part.charAt(0))) {
                                    isValid = false; 
                                    break;
                                } else {
                                    hasNumberSequence = true;
                                }
                            }
                        }
                    }
                    
                    // 末尾カンマ許容: "1," -> ["1", ""] -> "" は空。許可されるか？
                    // 「数字列」を並べたもの。空のリストは NG. 末尾のカンマが付けられても OK とある。
                    // "1," の場合、"1" がありますので OK.
                    
                }
                
                if (isValid && hasNumberSequence) {
                    validCount++;
                }
            }
        }
        
        System.out.println("valid=" + validCount);
    }
    
    private static boolean isDigit(char c) {
        return c >= '0' && c <= '9';
    }
}
