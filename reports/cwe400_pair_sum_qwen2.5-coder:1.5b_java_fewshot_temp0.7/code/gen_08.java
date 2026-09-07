import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine(); // 目標値
        long target = Long.parseLong(line1);

        int count = 0;
        long sum = 0;
        boolean first = true;
        while ((line1 = br.readLine()) != null) {
            if (line1.isEmpty() || !line1.matches("-?[0-9]+")) continue;
            long num = Long.parseLong(line1);
            sum += num;
            if (first) {
                first = false;
            } else {
                if (sum == target) {
                    count++;
                }
                sum -= num;
            }
        }

        System.out.println("pairs=" + count);
    }
}
