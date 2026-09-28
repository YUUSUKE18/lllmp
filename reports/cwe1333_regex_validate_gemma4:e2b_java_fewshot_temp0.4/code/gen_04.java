import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して処理
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容しつつ、カンマで分割して数字列が存在するか確認する
            // 末尾のカンマがある場合、split(",")の結果の最後の要素は空文字列になる
            // 例: "1,2," -> ["1", "2", ""]
            String[] parts = trimmedLine.split(",");
            
            // 妥当であるためには、少なくとも1つの数字列が存在する必要がある。
            // 末尾のカンマが許容されるため、parts.length >= 1 であれば、
            // 少なくとも数字列（空でない文字列）が存在する可能性がある。
            // ただし、「1 個以上の数字列がカンマで区切られて並んでいる」という条件を満たす必要がある。
            // これは、分割された要素のうち、空でないものが1つ以上存在すれば良い、と解釈する。
            
            boolean hasNumber = false;
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    hasNumber = true;
                    break;
                }
            }

            if (hasNumber) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
