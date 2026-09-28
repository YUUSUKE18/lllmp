import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            for (String part : line.split(",")) {
                if (part.trim().isEmpty()) continue;
                int value;
                try {
                    value = Integer.parseInt(part);
                } catch (NumberFormatException e) {
                    continue;
                }
                if (value < 0) continue;
                String numStr = String.valueOf(value);
                int num = 0;
                for (char c : numStr.toCharArray()) {
                    num = num * 10 + (c - '0');
                }
                count += num;
                sum += value;
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
