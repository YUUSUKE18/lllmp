import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long sum = 0;

        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) {
                continue;
            }
            // 値:回数の形式を検出（コロンが含まれていること）
            int colonIndex = part.indexOf(':');
            if (colonIndex == -1) {
                continue;
            }

            String valueStr = part.substring(0, colonIndex).trim();
            String countStr = part.substring(colonIndex + 1).trim();

            // 数値に変換し、失敗した場合はスキップ
            try {
                long value = Long.parseLong(valueStr);
                long repetition = Long.parseLong(countStr);
                
                if (repetition < 0) {
                    continue; // 回数は 0 以上である必要がある
                }

                count += repetition;
                sum += value * repetition;
            } catch (NumberFormatException e) {
                // 数値に変換できない場合はスキップ
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
