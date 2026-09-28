import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        String[] parts = line.split(",");
        long totalCount = 0;
        long totalSum = 0;

        for (String part : parts) {
            String[] keyValue = part.split(":");
            if (keyValue.length == 2) {
                try {
                    long value = Long.parseLong(keyValue[0].trim());
                    long count = Long.parseLong(keyValue[1].trim());

                    // 0以上の回数のみを考慮
                    if (count >= 0) {
                        totalCount += count;
                        totalSum += value * count;
                    }
                } catch (NumberFormatException e) {
                    // 数値変換エラーは無視
                }
            }
        }

        System.out.println("count=" + totalCount + " sum=" + totalSum);
    }
}
