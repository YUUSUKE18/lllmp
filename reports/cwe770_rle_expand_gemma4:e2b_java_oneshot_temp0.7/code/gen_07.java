import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        long totalCount = 0;
        long totalSum = 0;

        // カンマで区切って各要素を処理
        String[] parts = line.split(",");

        for (String part : parts) {
            // 各部分から "値:回数" の形式を抽出
            String[] keyValue = part.trim().split(":");
            if (keyValue.length != 2) {
                continue; // 形式が不正な場合は無視
            }

            try {
                int value = Integer.parseInt(keyValue[0].trim());
                int count = Integer.parseInt(keyValue[1].trim());

                if (count > 0) {
                    totalCount += count;
                    totalSum += (long) value * count;
                }
            } catch (NumberFormatException e) {
                // 整数変換に失敗した場合は無視
                continue;
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
