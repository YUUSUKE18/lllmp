import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        long totalCount = 0;
        long totalSum = 0;

        // カンマで区切って各要素を処理
        String[] parts = line.split(",");

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) continue;

            // 値:回数 の形式をパース
            String[] keyValue = trimmedPart.split(":");
            if (keyValue.length == 2) {
                try {
                    // 値 (値) は int として読み込む。回数は long (または int でも十分だが、合計に備えて long で扱う)
                    int value = Integer.parseInt(keyValue[0].trim());
                    long count = Long.parseLong(keyValue[1].trim());

                    // 回数が0以上であることを確認 (仕様上は保証されるが念のため)
                    if (count >= 0) {
                        totalCount += count;
                        totalSum += (long) value * count;
                    }
                } catch (NumberFormatException e) {
                    // パースエラーは無視する
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
