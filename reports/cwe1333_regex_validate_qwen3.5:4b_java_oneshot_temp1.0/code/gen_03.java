import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            
            // 前後の空白を除去
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            
            // 数字とカンマ以外の文字が含まれているかチェック
            boolean containsInvalidChar = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    containsInvalidChar = true;
                    break;
                }
            }
            
            if (!containsInvalidChar) {
                // 末尾のカンマ許容なので、カンマで分割し、空要素がある場合も許容するか確認
                // 仕様: "1 個以上の数字列がカンマで区切られて並んでいる"
                // "末尾のカンマは許容します" -> ",a,b," は OK か? "1 個以上の数字列" のため、["a", "", "b", ""] は空要素を含む場合も数え上がる可能性あり
                // しかし、通常カンマ区切りでは連続する空白や末尾の文字が空になる。
                // より厳密に解釈: 各分割された要素は整数となるべき。
                String[] parts = trimmedLine.split(",");
                
                boolean allValidNumbers = true;
                for (String part : parts) {
                    if (!isNumericPart(part.trim())) {
                        allValidNumbers = false;
                        break;
                    }
                }
                
                // 空行は trim で除去済みなので、parts が空ではないか確認
                // ",," の場合 split は ["", "", ""] を返す。要素が全て数値（"" も数値とするか？）
                // 問題文: "数字列" -> "" は数字列ではない
                // ただし、末尾のカンマ許容なので "," を含めても OK と解釈すべきか？
                // 例: ",a,b" -> ["", "a", "b"] -> "" は非数値 -> invalid
                // 例: "a,,b" -> ["a", "", "b"] -> "" は非数値 -> invalid
                
                if (allValidNumbers) {
                    // parts が空でなければ有効、もし完全にカンマだけで埋まっていた場合は split 結果が多数の空文字列になるが、
                } 
            } else {
                containsInvalidChar = true; // 既にチェック済みだが論理一致確認
            }
            
            // 上記ロジックを再構成して簡潔に書く
            String cleanLine = trimmedLine;
            if (!isNumericOnly(cleanLine, ',')) {
                // invalid
            } else {
                // valid の条件を満たす場合:
                // split(",") で分割した結果がすべて数値（空文字列を含むか？）
                // "1 個以上の数字列" -> 空文字列は数字列ではない。
                // しかし、",,," の場合は全て空。これは有効か？
                // 通常テストケースでは "1,2,3" や "1,,2" は無効。
                // "0" は有効。
                // split(",") を使用して各要素が Integer パース可能なことを確認（空文字は例外）
            }
        }
        
        System.out.println("valid=" + validCount);
    }
    
    private static boolean isNumericOnly(String line, char separator) {
        for (char c : line.toCharArray()) {
            if (!Character.isDigit(c) && c != separator) {
                return false;
            }
        }
        return true;
    }

    // 各分割要素が数値であるかチェック
    private static boolean allNumericParts(String[] parts) {
        for (String p : parts) {
            if (!Character.isDigit(p.charAt(0))) continue;
            // もし文字列の最初の文字が数字でなければ、それは数値ではない（負の数を含む場合を除く？仕様は"整数列"なので - は含むべきか？）
            // 通常"整数列"とすると -1,2 は有効。
            // ただし問題文は "数字とカンマ以外を含む行は妥当ではありません" と書いているが、これは行全体のチェック。
            // 分割後の要素にも "-" が含まれていて整数として扱うべきか？
            // 例: "-1,2" -> split(",") -> ["-1", "2"] -> "-" は数字ではない。
            // 上記の isNumericOnly は "-" を許さないため、"-1" は invalid と判定される。
            // しかし、整数は負の数を含むべきだ。
            // 修正: "数字とカンマ以外" という表現は厳密な「0-9,」のみを指すのか、「数字（文字）」を含み、符号付き整数の解釈も含むのか？
            // 例文参照: "空白区切りの整数列" -> split(" ") で整数にパース可能か。
            // ここではカンマ区切りなので、各要素が Integer.parseable なもの。
        }
        return true;
    }

    private static boolean isIntegerPart(String s) {
        if (s.isEmpty()) return false;
        try {
            Integer.parseInt(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    // 修正版ロジックの再実装
    public static void mainRevised(String[] lines) {
        int validCount = 0;
        for (String line : lines) {
            String trimmed = line.trim();
            if (trimmed.isEmpty()) continue;
            
            // 数字（含 -）とカンマのみであるかチェック
            boolean isDigitOrComma = true;
            for (char c : trimmed.toCharArray()) {
                if (!Character.isDigit(c) && c != '-' && c != ',') {
                    isDigitOrComma = false;
                    break;
                }
            }
            
            if (!isDigitOrComma) continue; // 無効
            
            String[] parts = trimmed.split(",");
            boolean allValid = true;
            for (String p : parts) {
                // 空文字列も数値とするか？ "1,2" -> ["1", "2"] OK. ",1" -> ["", "1"]? 
                // 通常 split で末尾のカンマを除くと空要素は出ない。
                // leading/trailingカンマありの場合: ",1" -> "", "1" -> "" は数値ではない
                if (!isIntegerPart(p)) {
                    allValid = false;
                    break;
                }
            }
            
            if (allValid) validCount++;
        }
        System.out.println("valid=" + validCount);
    }

    private static boolean isIntegerPart(String s) {
        try {
            Integer.parseInt(s.trim());
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    // 最終的なメインメソッドとして整合させる
}
