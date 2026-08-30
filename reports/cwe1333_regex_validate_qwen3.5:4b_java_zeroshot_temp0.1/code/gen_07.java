import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 前後の空白を除去
            line = line.trim();
            
            // 空行は妥当ではない
            if (line.isEmpty()) {
                continue;
            }
            
            // 数字とカンマ以外が含まれていないか確認
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
            
            // カンマ区切りの整数列として妥当か確認
            // 末尾のカンマは許容するため、カンマの数が偶数個（空の場合は 0）であれば OK
            int commaCount = 0;
            for (int i = 0; i < line.length(); i++) {
                if (line.charAt(i) == ',') {
                    commaCount++;
                }
            }
            
            // カンマが偶数個（0, 2, 4...）であれば、数字列が偶数個存在する（または空）
            // ただし、問題文の「1 個以上の数字列」は「末尾のカンマは許容します」という条件と矛盾しないか確認が必要。
            // 「1 個以上の数字列」＝カンマで区切られた部分が少なくとも 1 つある。
            // 例: "1,2," -> ["1", "2", ""] (3 つ) -> OK
            // 例: "1" -> ["1"] (1 つ) -> OK
            // 例: "" -> [] (0 つ) -> NG (空行は既に除外済みだが、空白のみならここでも除外されるべきか？仕様「数字とカンマ以外を含む行は妥当ではありません」なので空白のみは OK と解釈できるが、「1 個以上の数字列」という条件で空文字列自体は NG。
            // しかし、先ほどの「空行」の処理で line.isEmpty() を除くので、line が "   " の場合は trim() で "" になり除かれる。
            // したがって、残った line は少なくとも 1 つの数字を含むか、末尾カンマのみ（例: ","）など。
            // "1," -> ["1", ""] (2 つ) -> OK
            // ",1" -> ["", "1"] (2 つ) -> OK
            // カンマが偶数個であれば、分割された要素の数は奇数個になるか？
            // 例: "1,2," -> カンマ 2 個 -> 要素 3 個 (1, 2, "") -> OK
            // 例: "1" -> カンマ 0 個 -> 要素 1 個 (1) -> OK
            // 例: "," -> カンマ 1 個 -> 要素 2 個 ("", "") -> OK
            // 例: "" -> カンマ 0 個 -> 要素 0 個 -> NG (既に除かれる)
            // したがって、カンマの数が偶数個であれば「要素の数」は奇数個になり、「1 個以上の数字列」を満たす。
            // ただし、",," の場合 -> カンマ 2 個 -> 要素 3 個 ("", "", "") -> OK
            // したがって、カンマの数が偶数個であれば OK と判断できる。
            
            if (commaCount % 2 == 0) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
