import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 末尾の空白を無視するため、trim()を使用
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 妥当な行の判定ロジック
            // 1. カンマで区切られていること
            // 2. 数字のみ（カンマと数字のみ）で構成されていること
            // 3. 末尾のカンマは許容される

            boolean isValid = false;

            // 末尾のカンマを削除して、カンマで区切られた整数列のパターンに一致するかチェック
            // 1. カンマで区切られている
            // 2. 各要素が整数である
            // 3. 末尾にカンマがあっても良い
            
            // 行全体をカンマで分割してみる
            String[] parts = line.split(",");
            
            // 末尾のカンマが許容されることを考慮し、分割された要素をチェック
            // 例: "1,2,3," -> parts = ["1", "2", "3", ""]
            
            // すべての要素が数字（または空文字列、末尾のカンマによる）で構成されているかを確認する
            // この仕様の解釈を厳密に行うため、
            // 「1個以上の数字列がカンマで区切られて並んでいる」という条件に焦点を当てる。
            
            // 処理を簡略化し、
            // 1. カンマで分割した結果、一つ以上の非空の数字列が存在するかを調べる。
            // 2. 行全体が数字とカンマのみで構成されていることを確認する。（「数字とカンマ以外を含む行は妥当ではない」という条件）

            int numElements = 0;
            boolean allValidChars = true;

            for (int i = 0; i < line.length(); i++) {
                char c = line.charAt(i);
                if (c != ',' && c != ' ' && !Character.isDigit(c)) {
                    // 数字とカンマ以外を含む文字があれば不正
                    allValidChars = false;
                    break;
                }
            }
            
            if (!allValidChars) {
                continue; // 数字とカンマ以外が含まれていたらスキップ
            }
            
            // カンマで区切られた整数列の妥当性のチェック
            // 空行は既にスキップ済み。
            // 1個以上の数字列がカンマで区切られていること
            
            // trim()した後の文字列を再度処理し、カンマで区切られた要素の数を数える
            String effectiveLine = line.trim();
            if (effectiveLine.isEmpty()) {
                continue;
            }
            
            // 末尾のカンマを取り除いたもの
            String content = effectiveLine.endsWith(",") ? effectiveLine.substring(0, effectiveLine.length() - 1) : effectiveLine;
            
            if (content.isEmpty()) {
                // 例: "," のようにカンマのみの場合、これは妥当ではない（1個以上の数字列が必要）
                continue;
            }

            String[] actualParts = content.split(",");
            
            // 空の要素が含まれていて、それが不正な構造（例: ",," や "1,,2" のようなケース、ただし"1,,2"はallValidCharsチェックで失敗するはずだが、ここでは区切り方を重視）
            // ここでは、各要素が整数であるか、あるいは区切り文字として機能していることを確認する。
            
            int actualNumberCount = 0;
            for (String part : actualParts) {
                if (!part.isEmpty()) {
                    try {
                        Integer.parseInt(part);
                        actualNumberCount++;
                    } catch (NumberFormatException e) {
                        // allValidCharsチェックで既に数字以外が含まれていれば到達しないはずだが、念のため
                        allValidChars = false;
                        break;
                    }
                }
            }

            if (allValidChars && actualNumberCount >= 1) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
