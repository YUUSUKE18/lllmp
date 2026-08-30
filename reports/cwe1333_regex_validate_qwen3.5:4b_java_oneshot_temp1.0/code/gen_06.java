import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (validateLine(line)) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
    
    private static boolean validateLine(String line) {
        String trimmed = line.trim();
        if (trimmed.isEmpty()) {
            return false;
        }
        
        // 空白を含んだ文字列を区切る (カンマ、スペースなど空白すべてで分割可能だが、要求はカンマ区切りの数字列なので)
        // 要件: '1 個以上の数字列がカンマで区切られて並んでいる'
        // 末尾のカンマ許容。前後の空白無視済み。
        
        try {
            String[] parts = trimmed.split(",");
            
            // プート: 空文字列が含まれてはいけない (カンマ連続など) -> 要件: '1 個以上の数字列'
            // split を使うと空文字を含む場合は除外する必要があるか？
            // "a,,b" -> ["a", "", "b"] のような場合、空文字列の部分は数字ではないので妥当ではない。
            
            // しかし、split("，") を使った場合、末尾のカンマは配列に追加しない (Java 1.5+ の仕様)
            // 例: "1,2," -> ["1", "2"] (末尾空白はないが、入力 "1,2," は trim した上で split で扱う)
            // "1,,2" -> ["1", "", "2"] -> 空文字列を含むので不十分。
            
            // より確実に検証:カンマを区切った要素が全て数字か確認する。
            
            for (String part : parts) {
                if (!part.matches("-?[0-9]+")) {
                    return false;
                }
            }
            
            // 1 つ以上の要素があるか確認 (trimmed が空文字ではなく、かつ split が何らかの要素を出す必要がある)
            // "1," -> split(",") -> ["1"] -> OK.
            // ",1" -> [",1"]? 入力 ",1" は trim すると ",1".split("，") -> ["", "1"] -> ""が不十分 -> return false.
            // つまり、最初の要素は空文字でなければ良い。
            
            if (parts.length == 0) {
                return false;
            }
            
        } catch (Exception e) {
            return false;
        }
        
        return true;
    }
}
