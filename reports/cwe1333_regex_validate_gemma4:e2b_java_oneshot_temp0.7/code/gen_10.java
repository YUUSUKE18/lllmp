import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して処理
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを考慮して、カンマで分割を試みる
            // 末尾のカンマがあっても、split("\\s*,\\s*")の結果が空文字列を含まないかを確認する
            // または、カンマ区切りの整数列として妥当であるかを判定する
            
            // 妥当性の判定基準: 1個以上の数字列がカンマで区切られて並んでいること。
            // 末尾のカンマは許容される。

            // 1. 末尾のカンマを取り除く（もしあれば）
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // 2. カンマで分割する
            // カンマ区切りの整数列として妥当であるためには、分割後に空文字列が1つ以上存在し、
            // その間に整数が含まれている必要がある。
            // または、数字とカンマ以外を含まないことを確認する。

            // 妥当な行の判定ロジックを再考:
            // 「1 個以上の数字列がカンマで区切られて並んでいる」
            // 例: "1,2,3" -> 3つの数字列
            // 例: "1," -> 1つの数字列 (1) とカンマ
            // 例: "," -> 0個の数字列 (空) または 1個の空の数字列

            // 正規表現で数字とカンマのみで構成されているかを確認する
            // カンマ区切りで、数字のみを含むセグメントが1つ以上あることを確認する。
            
            // カンマ区切りとして処理し、各セグメントが整数であるか確認する。
            String[] parts = content.split(",");
            
            boolean isValid = false;
            if (parts.length > 0) {
                // 空の要素を除外して、数字列が1つ以上存在するか確認
                for (String part : parts) {
                    if (!part.trim().isEmpty()) {
                        try {
                            Integer.parseInt(part.trim());
                            isValid = true;
                            break;
                        } catch (NumberFormatException e) {
                            // 数字以外のものが含まれていたら無効
                            isValid = false; // この行全体が不正
                            break;
                        }
                    }
                }
            }
            
            // 最後の要素がカンマで終わるケース（例: "1,2,"）を考慮する場合、
            // 最後の要素が空文字列になる可能性があるため、上記のロジックで十分か確認。
            // "1,2," -> content="1,2" -> parts=["1", "2"] -> isValid=true (OK)
            // "," -> content="," -> parts=["", ""] -> isValid=false (OK, 0個の数字列)
            // "abc" -> content="abc" -> parts=["abc"] -> NumberFormatException -> isValid=false (OK)
            // "" (空行) -> continue でスキップ済み。
            
            if (isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
