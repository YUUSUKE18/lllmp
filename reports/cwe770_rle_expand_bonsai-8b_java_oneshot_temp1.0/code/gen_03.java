import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            String[] parts = line.trim().split(",");
            for (String part : parts) {
                String[] values = part.trim().split(":");
                if (values.length != 2) continue;
                String value = values[0].trim();
                String numStr = values[1].trim();
                if (value.isEmpty() || numStr.isEmpty()) continue;
                try {
                    int valueNum = Integer.parseInt(value);
                    int num = Integer.parseInt(numStr);
                    count += num;
                    sum += valueNum * num;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
