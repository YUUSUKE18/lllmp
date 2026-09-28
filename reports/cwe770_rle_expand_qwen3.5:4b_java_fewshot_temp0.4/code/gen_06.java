import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0;
        if (line != null) {
            for (String part : line.split(",")) {
                if (part.trim().isEmpty()) continue;
                int colonIndex = part.indexOf(':');
                if (colonIndex <= 0) continue;
                String valueStr = part.substring(0, colonIndex).trim();
                String countStr = part.substring(colonIndex + 1).trim();
                try {
                    long val = Long.parseLong(valueStr);
                    long num = Long.parseLong(countStr);
                    if (val >= 0 && num >= 0) {
                        count += num;
                        sum += val * num;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
