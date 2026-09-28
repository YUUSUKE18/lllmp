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
            String valStr = values[0];
            String numStr = values[1];
            if (valStr.isEmpty() || numStr.isEmpty()) continue;
            try {
                int val = Integer.parseInt(valStr);
                int num = Integer.parseInt(numStr);
                if (num >= 0) {
                    count += num;
                    sum += val * num;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
