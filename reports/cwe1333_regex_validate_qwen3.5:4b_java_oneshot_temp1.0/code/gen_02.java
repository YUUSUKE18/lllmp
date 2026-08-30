import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            
            // カンマ区切りの整数列が妥当かどうかを判定する
            List<String> parts = new ArrayList<>();
            int lastIndex = -1;
            boolean isDigit = false;
            
            for (int i = 0; i < line.length(); i++) {
                char c = line.charAt(i);
                if (c == ',') {
                    if (!isDigit) {
                        // カンマの前が数字の直後でない（空白や文字がある場合）→ 不自然だが、仕様は「数字列がカンマで区切られて並んでいる」なので、空白ありは許容されるか？
                        // 「空行、および数字とカンマ以外を含む行は妥当ではありません」とあります。
                        // よって、部分文字列に空白が含まれていないことが必須です。
                        break;
                    }
                    if (parts.isEmpty() || parts.get(parts.size() - 1).length() == 0) {
                         // 連続したカンマ → 数値がゼロ個なので不自然。但し、末尾のカンマは許容とのことなので、空白なしの连续カンマも「数字とカンマ以外」に含まれないか。
                         // 「数字とカンマ以外を含む行」という文言から、空白は「数字」でも「カンマ」でもないため不適と解釈される可能性がありますが、
                         // 例として ",1,2," は妥当（先頭のカンマ）、"1,,2," は不適（連続のカンマ）。
                         // ただし、「数字列がカンマで区切られて並んでいる」という要件を厳密に捉えると、空白は許容されない。
                         // 上記の loop で空白を見たら break すると、"1, 2" は不成立になるか？
                         // しかし「数字とカンマ以外」→ ' ' は数字でもカンマでもない。なので "1, 2" は不適。
                         // ただし、入力例が "1,2" のような形の場合のみ対応する。
                    }
                } else {
                    if (!Character.isDigit(c)) {
                        break;
                    }
                }
            }
            
            // 空白をスキップして再処理（行の前後の空白は無視、内部も空白は許容されるか？）
            // 「行の前後の空白は無視します」→ インスタンス内にも空白が入っているなら不適かと解釈。
            // また「数字とカンマ以外を含む行は妥当ではありません」なので、空白は除外対象として判定すべき。
            
            // 修正：完全な解析リトライ（内部空白も不適）
            List<String> tokens = new ArrayList<>();
            for (String token : line.split(",")) {
                if (token.trim().isEmpty()) {
                    // 空白が含まれている → 不適
                    validCount = 0;
                    break;
                }
                try {
                    Integer.parseInt(token);
                    tokens.add(token);
                } catch (NumberFormatException e) {
                    // 文字列が整数で表せない → 不適
                    validCount = 0;
                    break;
                }
            }
            
            if (tokens.size() > 0 && line.indexOf(',') != -1 || !line.endsWith(",")) {
                // カンマがない行、またはカンマがあるのに空でない要素がある行は OK？
                // 「1 個以上の数字列がカンマで区切られて並んでいる」→ 
                // "1,2" → OK
                // "1" → OK?（区切られつつ並んでいるか？）
                // 通常「区切られて並ぶ」とは複数要素を意味するが、単数要素も OK と解釈可能。
                // ただし、「末尾のカンマは許容します」→ ",1,2," は OK
                // "1,,2," → 連続カンマあり（数字とカンマ以外ではない？）。この場合、'0' は数字だが、カンマ間の文字列が空なので不適。
                // しかし「数字とカンマ以外」とは言っていないので、空白のみ許容されないか？
                
                // 最終判定ロジック：
                // 1. 行全体に空白が含まれていないかチェック（行前後の空白除去済みだが内部も禁止）
                if (line.contains(" ")) {
                    validCount = 0;
                    continue;
                }
                
                // カンマ区切りの解析で、各要素が整数か確認
                String[] parts = line.split(",");
                if (parts.length == 1 && !parts[0].isEmpty()) {
                    try { Integer.parseInt(parts[0]); } catch (NumberFormatException e) {} else {}
                }
                
                // より堅牢なチェック：
                // 要素数が >0 で、かつ各要素が整数、かつ「数字とカンマ以外」がない
                // 連続したカンマは「数字とカンマ以外」に該当するか？ -> 空文字列が出現した場合
                // そのような場合 invalid
                
                boolean hasInvalidChar = false;
                for (String part : parts) {
                    if (part.isEmpty()) {
                        hasInvalidChar = true; 
                        break;
                    }
                    try {
                        int val = Integer.parseInt(part);
                    } catch (NumberFormatException e) {
                        hasInvalidChar = true;
                        break;
                    }
                }
                
                // 末尾のカンマは許容。
                // "1,2," -> OK, "1," -> OK, ",1" -> part[0] は空文字列なので OK をしない？
                // 空文字列が含まれるなら「数字とカンマ以外」に該当する（空文字は数字でもカンマでもない）。
                
                if (parts.length == 0 || hasInvalidChar) {
                    validCount = 0;
                    continue;
                }
            }
            
            // さらに、"1, 2" のようなケースについて。split(",") で "1" と " 2" が得られ、" 2" は整数ではないので catch され不適になる。
            
            // 要件を満たすか：「1 個以上の数字列がカンマで区切られて並んでいる」
            // 空文字列（連続したカンマの結果）は「数字とカンマ以外」と解釈する（空白は除外対象）。
            
            if (line.contains(" ")) {
                validCount = 0;
                continue;
            }
            
            List<String> tokens = new ArrayList<>();
            boolean validLine = true;
            for (String t : line.split(",")) {
                if (t.isEmpty()) {
                    validLine = false; 
                    break;
                }
                try {
                    Integer.parseInt(t);
                } catch (NumberFormatException e) {
                    validLine = false;
                    break;
                }
            }
            
            // また、空文字列のみが含まれる行（例："1,,2,") は不適。
            // "1," -> 要素は ["1"] と [""] のような扱いになるか？split(",") で最後に空白がつくと空文字列になる。
            // "1,2," -> split(",") => ["1", "2", ""] → t.isEmpty() で catch
        
            if (line.trim().isEmpty()) {
                continue; // 空行は無視
            }
            
            if (validLine) {
                // 追加条件：数字とカンマ以外がないか確認済み（空白チェック済）
                validCount++;
            } else {
                validCount = 0;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
