import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int validCount = 0;
        
        while ((line = br.readLine()) != null) {
            if (isValid(line)) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }

    private static boolean isValid(String line) {
        if (line == null || line.trim().isEmpty()) {
            return false;
        }

        String[] parts = line.split(",");
        int partCount = parts.length;

        for (int i = 0; i < partCount; i++) {
            String part = parts[i];
            if (part.isEmpty()) {
                // 空の部分がある場合、条件「1 個以上の数字列がカンマで区切られて並んでいる」を満たさないので妥当ではない
                return false;
            }
            
            // 空白を含むかどうかチェック（trim を使うと前後の空白は無視できるが、中身が空白なら空文字扱いになるため注意）
            // 仕様: "数字とカンマ以外を含む行は妥当ではありません" -> 空白も数字・カンマ以外なので許されない
            if (!part.matches("\\d+")) {
                return false;
            }
        }

        return true;
    }
}
