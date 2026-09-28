import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            for (String part : line.trim().split(",")) {
                if (part.isEmpty()) continue;
                String[] valueSum = part.split(":");
                if (valueSum.length < 2) continue;
                try {
                    int value = Integer.parseInt(valueSum[0]);
                    int num = Integer.parseInt(valueSum[1]);
                    if (num < 0) continue;
                    count += num;
                    sum += value * num;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
