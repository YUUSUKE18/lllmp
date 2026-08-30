import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して判定
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを除去した後の文字列を処理する
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで区切られた部分をすべてチェックする
            String[] parts = content.split(",");
            
            // 1個以上の数字列がカンマで区切られて並んでいるか、かつ、
            // 各部分が数字列（または空文字列だが、ここではチェックが厳密になるため、数字列のみをチェックする）
            // 仕様に基づくと「1個以上の数字列がカンマで区切られて並んでいる」ことが重要。
            // 空白や数字とカンマ以外を含む行は妥当ではない。
            
            // partsの長さが1以上であること、かつ、すべての部分が数字（カンマで区切られているため、空でないことが重要）
            // 仕様：「1個以上の数字列がカンマで区切られて並んでいる」
            // 空でない数字列が存在すればよい。
            
            boolean isValid = false;
            for (String part : parts) {
                if (!part.isEmpty()) {
                    try {
                        // 数字としてパース可能かチェック。もし数字列以外が含まれていたら例外になるはずだが、
                        // split(",")は区切り文字のみで分割するので、数字とカンマ以外を含むのは、
                        // それ自体がpartに含まれている場合に問題となる。
                        // ここでは、partが数字のみで構成されているかを確認する。
                        int num = Integer.parseInt(part);
                    } catch (NumberFormatException e) {
                        // 数字としてパースできなかった場合、この行は妥当ではない
                        isValid = false;
                        break;
                    }
                }
            }

            if (isValid) {
                // 1個以上の数字列が存在したことを確認済み
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
