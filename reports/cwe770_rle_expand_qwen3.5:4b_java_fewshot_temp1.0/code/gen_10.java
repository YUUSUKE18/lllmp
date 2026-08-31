import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        long count = 0;
        long sum = 0;

        String[] parts = line.split(",");
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty() || !part.contains(":")) {
                continue;
            }

            try {
                String valueStr = part.substring(0, part.indexOf(':')).trim();
                String countStr = part.substring(part.indexOf(':') + 1).trim();

                int value = Integer.parseInt(valueStr);
                long repeatedCount = Long.parseLong(countStr);

                if (valueStr.isEmpty() || countStr.isEmpty()) {
                    continue;
                }

                for (int i = 0; i < repeatedCount; i++) {
                    sum += value;
                    count++;
                }
            } catch (NumberFormatException e) {
                // 形式や数値の間違いは無視する
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
