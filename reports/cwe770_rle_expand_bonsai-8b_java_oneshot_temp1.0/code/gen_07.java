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
            for (String part : line.trim().split(",")) {
                if (part.isEmpty()) continue;
                String[] values = part.split(":");
                if (values.length < 2) continue;
                try {
                    int val = Integer.parseInt(values[0]);
                    int freq = Integer.parseInt(values[1]);
                    if (first || val > count || val * freq > sum) {
                        count = val;
                        sum = val * freq;
                        first = false;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
