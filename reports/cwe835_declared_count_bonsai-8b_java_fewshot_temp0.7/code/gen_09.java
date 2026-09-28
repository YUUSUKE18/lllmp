import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        int count = 0;
        int sum = 0;
        String[] nums = line.trim().split("\\d+");
        count = nums.length;
        sum = 0;
        for (int i = 0; i < count; i++) {
            String s = br.readLine();
            if (s == null) break;
            s = s.trim();
            if (s.isEmpty()) continue;
            try {
                int n = Integer.parseInt(s);
                sum += n;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
