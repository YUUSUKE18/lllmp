import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        long totalCount = 0;
        long totalSum = 0;

        String[] parts = line.split(",");

        for (String part : parts) {
            String[] keyValue = part.split(":");
            if (keyValue.length == 2) {
                try {
                    // 値 (value) は整数として扱う
                    int value = Integer.parseInt(keyValue[0].trim());
                    // 回数 (count) は整数として扱う
                    int count = Integer.parseInt(keyValue[1].trim());

                    if (count > 0) {
                        totalCount += count;
                        totalSum += (long) value * count;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換エラーは無視する
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
