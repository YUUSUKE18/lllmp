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
                int value;
                try {
                    value = Integer.parseInt(s.split(":")[0]);
                } catch (NumberFormatException e) {
                    continue;
                }
                int num;
                try {
                    num = Integer.parseInt(s.split(":")[1]);
                } catch (NumberFormatException e) {
                    continue;
                }
                if (num <= 0) continue;
                count += num;
                sum += value * num;
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
