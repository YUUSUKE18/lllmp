import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        boolean validCount = true;

        String line;
        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            // 正規表現でチェック:
            // ^                 : 始端
            // \s*              : 空白の開始許容
            // (?=[0-9,]+)      : 1 文字以上の数字またはカンマが存在する (非空チェック)
            // [0-9,]*          : 数字とカンマのみ
            // \s*$             : 空白の終了許容
            if (!line.matches("(?=[0-9,]+)[0-9,]*\\s*$")) {
                validCount = false;
                break;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
