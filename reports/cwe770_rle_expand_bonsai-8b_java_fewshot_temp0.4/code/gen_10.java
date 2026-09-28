import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            for (String e : line.split(",")) {
                if (e.trim().isEmpty()) continue;
                int value;
                try {
                    value = Integer.parseInt(e.split(":")[0]);
                } catch (NumberFormatException e) {
                    continue;
                }
                int freq;
                try {
                    freq = Integer.parseInt(e.split(":")[1]);
                } catch (NumberFormatException e) {
                    continue;
                }
                if (freq <= 0) continue;
                count += freq;
                sum += value * freq;
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
