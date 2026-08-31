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
                part = part.trim();
                if (part.isEmpty()) continue;
                int colonIndex = part.indexOf(':');
                if (colonIndex == -1) continue;
                String valueStr = part.substring(0, colonIndex).trim();
                String countStr = part.substring(colonIndex + 1).trim();
                try {
                    long val = Long.parseLong(valueStr);
                    long times = Long.parseLong(countStr);
                    if (times > 0) {
                        sum += val * times;
                        count += times;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
