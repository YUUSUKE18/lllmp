public class Main {
    public static void main(String[] args) {
        StringBuilder input = new StringBuilder(System.in);
        int count = 0;
        
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            while (input.length() < input.capacity()) { // Infinite loop simulation for stdin
                String line = br.readLine();
                if (line == null) break;
                
                line = line.trim();
                if (line.isEmpty()) continue;
                
                if (!isValidLine(line)) continue;
                
                count++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        System.out.println("valid=" + count);
    }

    private static boolean isValidLine(String line) {
        String trimmed = line.trim();
        if (trimmed.isEmpty()) return false;
        
        // 文字列をカンマで分割し、各要素が整数かどうかを確認する
        String[] parts = trimmed.split(",", -1); // -1 は末尾の空要素を含めないように (実際には許容される)
        
        for (String part : parts) {
            if (part.isEmpty()) return false;
            
            try {
                Integer.parseInt(part.trim());
            } catch (NumberFormatException e) {
                return false;
            }
        }
        
        // 上記の処理は文字列分割後の要素チェックだが、正規表現を要求されているため、
        // 正規表現を用いて再確認する。
        // 仕様: 数字とカンマ以外を含む行は不十分。末尾のカンマ許容。空行無視。
        // 正規表現パターン: ^\s*(?:\d+(?:,\s*\d+)*)?\s*$ (ただし、要素が少なくとも1つある必要があるため)
        // より厳密に: ^\s*(?:\d+\s*,\s*\d+)*\s*|\s*\d+\s*$ -> これは少し複雑。
        
        // 再考: 
        // 1. 全体が空白のみなら不適 (既に trim で空だとフィルタ外だが、trim 後が空でも要素なしなので不適)
        // 2. 正規表現でパターンを定義する。
        //    - 少なくとも1つの数字を持つ必要があります。
        //    - 形式: [空白] 数 [, 数 ... ] [空白] または [空白] 数 [, ] [空白] (末尾カンマあり)
        //    正規表現: ^\s*(?:\d+(?:,\s*\d+)*)?(\s*,)?\s*$ -> これは末尾カンマを許容しつつ、要素が存在することを保証しますか？
        
        // 修正したアプローチ:
        // 1. 空白削除 (trim)
        // 2. 正規表現でチェック: ^\s*(?:\d+(?:,\s*\d+)*)?\s*$ は「数字のみ」または「末尾カンマ付き」を許容？
        //    - \s*: 空白開始
        //    - (?: ... )+: 少なくとも一度の繰り返し -> これは「数 [, 数]」の連続を意味する。
        //    - しかし、単一の「10」も許容するか？仕様: "1 個以上の数字列がカンマで区切られて並んでいる"
        //      -> 「10,20」は OK、「10」は OK、「10,」は OK。
        
        // 正規表現の再構築:
        // ^\s*(?:\d+(?:,\s*\d+)*)?\s*$ は「数字のみ」または「末尾カンマ付きの数字列」を許容するが、
        // 「10,20」の場合、(?:\d+(?:,\s*\d+)*) が 2 回繰り返される必要があるか？
        // \d+ (最初の数) + (?:,\s*\d+)* (後の数) -> これは「10,20」は OK。
        // しかし、「10,」(末尾カンマのみ) は、\d+(?:,\s*\d+) がマッチしないため、このパターンではダメ。
        
        // 正しい正規表現:
        // ^\s*(?:\d+(?:,\s*\d+)*|\d+\s*,)\s*$ -> これは「10,20」または「10,」を許容？
        // (?:\d+(?:,\s*\d+)* ) : "10" または "10,20" など
        // | \d+\s*,          : "10," のような末尾カンマのみ
        
        // よりシンプル: ^\s*(?:\d+(?:,\s*\d+)*)?(\s*,)?\s*$ -> これは「10」も「10,」も許容。
        // しかし、「10, 20」の場合、このパターンは「10, 」と「20」としてマッチする？
        // \d+(?:,\s*\d+)* の内部は「\d+」 followed by zero or more of 「,\s*」 followed by 「\d+」.
        // 「10, 20」の場合: \d+ -> "10", then (?:,\s*\d+)* matches ", 20". OK.
        // 「10,」の場合: \d+ -> "10", then (?:,\s*\d+)* matches nothing. But we have trailing comma.
        // So we need to allow optional trailing comma.
        
        // Final Regex: ^\s*(?:\d+(?:,\s*\d+)*)?(\s*,)?\s*$
        // Wait, if input is "10,20", \d+ matches 10, then (?:,\s*\d+)* matches ",20". OK.
        // If input is "10,", \d+ matches 10, then (?:,\s*\d+)* matches nothing. Then (\s*,)? matches ",". OK.
        // If input is "10", \d+ matches 10, then (?:,\s*\d+)* matches nothing. Then (\s*,)? matches nothing. OK.
        
        // But wait, the regex above allows multiple groups if we use + on the outer part? No, (?:...) is non-capturing group.
        // Let's refine: ^\s*(?:\d+(?:,\s*\d+)*)?(\s*,)?\s*$
        // This regex matches strings like "10", "10,20", "10,".
        // Does it match "10, 20"? Yes (space inside comma group).
        // Does it match " 10 , 20 "? Yes.
        
        // However, there is a catch: if we have "10,20,", \d+ matches 10, (?:,\s*\d+)* matches ",20", then (\s*,)? matches ",". OK.
        
        // Wait, does it match "10,20" with the trailing comma logic?
        // Let's trace "10,20":
        // ^\s* -> empty
        // (?:\d+(?:,\s*\d+)*)? -> \d+ matches "10", then (?:,\s*\d+)* tries to match ",20".
        // Inside: , matches comma, \s* matches empty, \d+ matches "20". So it matches the whole string.
        // Then (\s*,)? is optional and not needed. OK.
        
        // Trace "10," :
        // ^\s* -> empty
        // (?:\d+(?:,\s*\d+)*)? -> \d+ matches "10", then (?:,\s*\d+)* tries to match nothing (since next is comma, not digit). Matches empty.
        // Then (\s*,)? matches ",". OK.
        
        // Trace " 10 , 20 ":
        // ^\s* -> " "
        // (?:\d+(?:,\s*\d+)*)? -> \d+ matches "10", then (?:,\s*\d+)* matches ", 20" (comma, space, 20). OK.
        // Then (\s*,)? optional. OK.
        
        // Trace "10a":
        // ^\s* -> empty
        // (?:\d+(?:,\s*\d+)*)? -> \d+ matches "10", then (?:,\s*\d+)* tries to match "a". Fails. Matches nothing.
        // Then (\s*,)? optional. OK. But wait, the engine backtracks?
        // Actually, the regex engine will fail if \d+ cannot consume "10a". It consumes "10", then tries to match rest "a".
        // (?:,\s*\d+)* fails on "a". So the whole group fails. Then (\s*,)? fails. Overall fails. Correct.
        
        // Trace "10 20" (no comma):
        // ^\s* -> empty
        // (?:\d+(?:,\s*\d+)*)? -> \d+ matches "10". Rest is " 20".
        // (?:,\s*\d+)* tries to match ",". Fails on " ". So group fails.
        // Then (\s*,)? tries to match ",". Fails on " ". OK. Overall fails. Correct.
        
        // Wait, what if input is "10 20"?
        // My regex expects commas or spaces only after digits? No, the regex doesn't enforce space after comma unless \s* allows it.
        // But "10 20" has no comma. So (?:,\s*\d+)* cannot match " 20". So it fails. Correct.
        
        // One edge case: What if input is empty string?
        // ^\s* matches empty. (?:...) optional. (\s*,)? optional. Matches empty.
        // But we already filter out empty lines before calling this method.
        // Wait, the spec says "空行...は妥当ではありません".
        // So if line is empty or whitespace only, it should be invalid.
        // My code filters trim.isEmpty() -> continue (skip counting).
        // If trim is not empty but contains only spaces? e.g. "   "
        // trim makes it empty, so it's skipped. Correct.
        
        // But what if input is " 10 " ?
        // trim -> "10". Matches regex. OK.
        
        // What if input is "10," (trailing comma)?
        // trim -> "10,". Regex matches. OK.
        
        // What if input is "10, 20" (space after comma)?
        // trim -> "10, 20". Regex matches. OK.
        
        // So the regex seems correct for the constraints.
        
        return java.util.regex.Pattern.matches("^\\s*(?:\\d+(?:,\\s*\\d+)*)(?:,\\s*)?\\s*$", trimmed);
    }
}
