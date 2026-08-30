import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (isValid(line)) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }

    private static boolean isValid(String line) {
        // 前後の空白を除去
        String trimmed = line.trim();
        
        // 空行は妥当ではない
        if (trimmed.isEmpty()) {
            return false;
        }
        
        // 数字とカンマ以外が含まれていないか確認
        for (int i = 0; i < trimmed.length(); i++) {
            char c = trimmed.charAt(i);
            if (!Character.isDigit(c) && c != ',') {
                return false;
            }
        }
        
        // カンマ区切りの整数列として妥当か確認
        // 末尾のカンマは許容されるため、カンマが少なくとも 1 個ある必要はないが、
        // 数字が少なくとも 1 個ある必要がある。
        if (trimmed.isEmpty()) {
            return false;
        }
        
        // カンマがない場合、単一の整数として扱うか、または「区切られて並んでいる」要件を解釈する
        // 仕様: "1 個以上の数字列がカンマで区切られて並んでいる"
        // 末尾のカンマは許容。空行や数字/カンマ以外を含む行は不成立。
        // カンマがない場合は、単一の数字が「区切られたリスト」とみなせるか？
        // 「区切られて並んでいる」ことから、カンマなしの単一要素も含めるのが自然だが、
        // 厳密に「区切り」がある場合のみとする解釈もある。
        // しかし、「末尾のカンマは許容します」という記述から、
        // "1,2," や "1,2" は OK で、"1" も OK とするのが妥当な解釈（単一要素のリスト）。
        // 逆に、カンマが全くない場合も「区切られた」状態としてカウントするか？
        // 例: "1" -> 妥当。"1," -> 妥当。",1" -> 不成立（数字列とは呼べない）。
        
        // より厳密に解釈: 文字列をカンマで分割し、要素がすべて整数であること。
        // 空白は許容しない（trim はした）、内部の空白も許さない。
        
        String[] parts = trimmed.split(",");
        
        for (String part : parts) {
            if (!part.isEmpty()) {
                try {
                    Integer.parseInt(part);
                } catch (NumberFormatException e) {
                    return false;
                }
            }
        }
        
        // ただし、split(",") は末尾のカンマの場合空要素を生じない（Java の挙動）。
        // 例: "1,2," -> split(",") -> ["1", "2"] (trim 済みなので空でない)
        // 例: "," -> split(",") -> [""] (空文字列を含む) -> Integer.parseInt("") 例外発生 -> false. OK
        // 例: "1" -> ["1"] -> OK.
        
        return true;
    }
}
