import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        String[] parts = line.trim().split(",");
        for (String part : parts) {
            String[] values = part.trim().split(":");
            if (values.length != 2) continue;
            String valueStr = values[0];
            String countStr = values[1];
            if (valueStr.isEmpty() || countStr.isEmpty()) continue;
            try {
                int value = Integer.parseInt(valueStr);
                int countNum = Integer.parseInt(countStr);
                if (countNum >= 0) {
                    count += countNum;
                    sum += value * countNum;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
