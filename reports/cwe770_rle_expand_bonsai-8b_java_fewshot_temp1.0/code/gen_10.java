import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            for (String s : line.split(",")) {
                if (s.trim().isEmpty()) continue;
                String[] parts = s.split(":");
                if (parts.length < 2) continue;
                try {
                    int value = Integer.parseInt(parts[0]);
                    int num = Integer.parseInt(parts[1]);
                    if (num > 0) {
                        count += num;
                        sum += value * num;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
