import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        String regex = "^\\s*(\\d+(?:,\\d+)*|)(\\s*$)"; // ^ or \d+ followed by optional ,\d+, ending with optional whitespace and newline
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.isEmpty()) {
                continue;
            }
            
            // 正規表現で検証:
            // 1. シミュレーションでは、行の末尾のカンマは許容されるが、数字列のみで終わることも。
            // しかし、仕様「末尾のカンマは許容します」かつ「数字とカンマ以外を含む行は妥当ではありません」
            // よって、「空白文字が含まれても（前後）、カンマ区切りの整数列」という意味を捉えるために
            // 正規表現として、以下の形が正当：
            // - 空白の前後で: [ \t]*[0-9]+(\,[0-9]+)*[\t ]* 
            //   ただし「末尾のカンマ」も許容されるため、最後の数字列後にカンマがあることも。
            //   よって、[ \t]* ( [0-9]+(\,[0-9]+)* | , ) [ \t]* と捉えるか、あるいは
            //   簡潔に、空白を除外した文字列のみが「数字列とカンマ」で構成されていることを確認する。
            
            // より厳密に解釈:
            // 1. 行の前後の空白は無視 -> トランスクリプト処理（leading/trailing whitespace remove）
            // 2. 内容: [0-9]+,(\[0-9]+\])* | , (末尾カンマのみ)
            // 3. もし「末尾のカンマ」が許容されるなら、文字列の最後の文字がカンマであることはある。
            //    ただし、もし数字列がない場合（空行）は問題外だが、「空行」は処理されないので内部でスキップ済み。
            
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は妥当ではなくスキップ
            }
            
            // 正規表現をチェック:
            // [0-9]+([0-9]+,?[0-9]*)* の形式？
            // No. The spec says "comma-separated integer lists".
            // So it could be like: "1,2", or "1,2," (allowed by spec), or " 3 ,4 ".
            // However, "数字とカンマ以外を含む行は妥当ではありません" -> No other chars allowed.
            // So content after trim must match pattern for digits and commas only.
            // And it must represent a valid list of integers.
            
            // Correct logic: The line (after removing leading/trailing spaces) must consist ONLY of numbers and commas,
            // AND represent one or more integer sequences separated by commas? Or just comma-separated integers?
            // "1 個以上の数字列がカンマで区切られて並んでいる" -> At least one number list. 
            // A number list is a single digit (or digits) sequence.
            // So: "5", or "5,2", or "5,," (is ,, allowed? Probably not as integer).
            // We assume standard integers: 0-9+
            
            // Valid form after trim:
            // [0-9]+([0-9]*(?:,[0-9]+)+)? | , 
            // Actually simpler: After trim, it must contain only digits and commas.
            // And it must parse as at least one integer optionally followed by comma(s) at the end?
            // But "1 個以上の数字列がカンマで区切られて並んでいる" means something like [int][,][int]...
            // The allowed trailing comma is a bit specific. If we have "5," then it's one integer (5) and a comma at end.
            
            // Let's use regex: ^[0-9]+([0-9]*,[0-9]*)*$ 
            // But this allows empty middle parts? No.
            // Better: ^(\d+)+(\,\d+)?$ -> This requires at least one number, then zero or more groups of (comma + number).
            // But we also allow trailing comma only: "5," -> \d+(,\d*)? -> \d+, -> yes if we capture it differently.
            
            // Revised: ^(\d+)+(?:\,\d+)*$ | ^\d+(?:\,)? 
            // Actually simpler: Just check if the string contains non-digit and non-comma chars after trim? And at least one digit exists?
            // Because "数字列" (integer list) must have digits.
            // So if a string is ",," it has no integer -> invalid.
            
            // Final Regex Logic:
            // 1. Line contains only digits and commas after trimming whitespace.
            // 2. There is at least one digit present.
            // 3. The format allows optional trailing comma? e.g. "1,2," or "5,"?
            // Wait, if "1,2," is allowed, then regex should allow it.
            
            // So: \d+(\,\d+)*\,* -> \d+(?:\,\d+)*(?:\,)
            // But what about "1,2" without trailing comma? Also allowed.
            // Pattern: \d+(\,\d+)*(?:\,)?$ -> This forces a trailing comma for valid list? No, that's not right.
            
            // Let's simplify: The content must be a sequence of integers separated by commas.
            // Valid cases: "1", "1,2", "1,,  (double comma?) -> Probably invalid as integer."
            // Since "integer list" implies valid integers.
            // But spec says "末尾のカンマは許容します". So "1," is valid.
            
            // Regex: ^(\d+(?:,\d+)*)?($ | ,)? 
            // Actually, just ensure no other chars exist.
            // If we use regex: \\s*[^0-9,,]\\s*$ -> fail if found.
            // But structure also matters: must have at least one integer.
            
            // Let's try: ^[0-9]+(?:,[0-9]+)*(?:,)?$
            // Does this cover "1,"? Yes. "1"? Yes. "1,2"? Yes.
            // Does it allow "1,,"? No, because after 1 we need \\d+. 
            // Wait, spec says: "1 個以上の数字列". So a valid list contains integers.
            // So "1,,2" -> two numbers? The double comma makes it ambiguous but technically 1 is there.
            // But regex above forbids double comma.
            
            // Is double comma allowed? Probably not, as "数字列" implies one contiguous number string.
            // If we have "1,2", that's two integers.
            // So pattern: \d+ followed by (,\d+) zero or more times? 
            // And optionally a trailing comma at the very end? 
            // So: \d+(?:,\d+)*(?:,)? 
            // Check against spec: "1 個以上の数字列" -> \d+ is one list.
            // "(?:,\d+)*" adds more lists.
            // And trailing comma allowed means we can have \d+, or \d+,2,.
            
            // Wait, does \d+(?:,\d+)*(?:,) allow "1,"? Yes.
            // Does it allow "1"? Yes.
            // Does it allow "1,,2"? No (requires digit after comma).
            // Is "1,,2" valid? Probably not as it has two commas between empty space.
            
            // So let's use: ^[0-9]+(?:,[0-9]+)*(?:,)?$ 
            // This seems safe and matches requirements strictly.
            
            boolean isValid = false;
            if (trimmedLine.matches("[0-9]+(?:,[0-9]+)*(?:,)?$")) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
