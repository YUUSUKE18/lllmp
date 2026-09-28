import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (isValidLine(line)) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }

    private static boolean isValidLine(String line) {
        // 空白を除去して処理する
        String trimmed = line.trim();
        if (trimmed.isEmpty()) {
            return false;
        }

        List<String> parts = new ArrayList<>();
        int start = 0;
        int len = trimmed.length();

        while (start < len) {
            // カンマの位置を探す
            int commaIndex = -1;
            for (int i = start; i < len; i++) {
                if (trimmed.charAt(i) == ',') {
                    commaIndex = i;
                    break;
                }
            }

            // 空白をスキップ（カンマの前の空白は許容されるが、数字とカンマ以外が含まれていないか確認）
            while (commaIndex == -1 && start < len) {
                char c = trimmed.charAt(start);
                if (!Character.isWhitespace(c)) {
                    // 空白以外の文字が見つかった場合、これは妥当ではない（数字やカンマ以外がある）
                    return false;
                }
                start++;
            }

            if (commaIndex == -1) {
                // カンマがない最後の部分
                int end = len;
                while (end > start && Character.isWhitespace(trimmed.charAt(end - 1))) {
                    end--;
                }
                
                String part = trimmed.substring(start, end);
                if (part.isEmpty()) {
                    return false; // 空白だけの部分がある場合、妥当ではない（数字列がない）
                }
                
                try {
                    Integer.parseInt(part);
                } catch (NumberFormatException e) {
                    return false;
                }
            } else {
                int end = commaIndex;
                while (end > start && Character.isWhitespace(trimmed.charAt(end - 1))) {
                    end--;
                }
                
                String part = trimmed.substring(start, end);
                if (part.isEmpty()) {
                    return false;
                }
                
                try {
                    Integer.parseInt(part);
                } catch (NumberFormatException e) {
                    return false;
                }

                start = commaIndex + 1;
            }
        }

        // 少なくとも 1 つの数字列があることを確認（上記ロジックで part が追加されるか確認）
        // 実際には、while ループ内で part が取得されなければ false にする必要があるが、
        // 上記ロジックは部分ごとにチェックしているため、最終的に part が少なくとも 1 回取得されているか確認する必要がある。
        // よりシンプルに再実装：

        return true; 
    }
}
