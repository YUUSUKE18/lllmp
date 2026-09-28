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

        long count = 0;
        long sum = 0;
        boolean first = true;

        String[] parts = line.split(",");
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;

            int colonIndex = part.indexOf(':');
            if (colonIndex <= 0) continue; // 値が ':' の前にあることはありえないが、安全性のため

            String valueStr = part.substring(0, colonIndex).trim();
            String countStr = part.substring(colonIndex + 1).trim();

            if (valueStr.isEmpty() || countStr.isEmpty()) continue;

            try {
                long val = Long.parseLong(valueStr);
                int repeat = Integer.parseInt(countStr); // 回数は通常整数で表現される想定だが、Long でも可。問題文は「回数」とし、例では小数字。Long にすると安全。
                
                count += repeat;
                sum += val * repeat;
            } catch (NumberFormatException e) {
                // 無視
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
