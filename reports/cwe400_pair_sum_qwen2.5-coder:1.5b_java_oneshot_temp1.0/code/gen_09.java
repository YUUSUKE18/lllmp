import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = Long.parseLong(line.trim());
        long pairs = 0;
        boolean first = true;
        boolean second = false;
        long lastNum = 0;
        long sum = 0;
        for (int i = 1; i < 1000; i++) {
            if (first || !isInteger(line.trim())) {
                first = true;
                second = false;
                lastNum = Long.parseLong(line.trim());
                sum = lastNum;
                continue;
            }
            if (second) {
                sum += lastNum;
                if (sum == target) {
                    pairs++;
                }
            }
            second = true;
            lastNum = Long.parseLong(line.trim());
        }
        System.out.println("pairs=" + pairs);
    }

    private static boolean isInteger(String s) {
        try {
            Long.parseLong(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
