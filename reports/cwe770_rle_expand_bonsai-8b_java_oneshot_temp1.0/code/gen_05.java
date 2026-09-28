import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long sum = 0;
        boolean first = true;
        if (line != null) {
            String[] parts = line.trim().split(",");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                String[] valuePart = part.split(":");
                if (valuePart.length != 2) continue;
                String valueStr = valuePart[0];
                String countStr = valuePart[1];
                if (!valueStr.matches("\\d+")) continue;
                if (!countStr.matches("\\d+")) continue;
                int value = Integer.parseInt(valueStr);
                int num = Integer.parseInt(countStr);
                if (num < 0) continue;
                for (int i = 0; i < num; i++) {
                    if (first || value > sum) { sum = value; first = false; }
                    count++;
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
