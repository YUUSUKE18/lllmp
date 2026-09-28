import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        int count = 0;
        long sum = 0;
        String[] nums = line.trim().split("\\d+");
        if (nums.length > 0) count = nums.length;
        for (int i = 0; i < nums.length; i++) {
            String numStr = nums[i];
            if (numStr.trim().isEmpty()) continue;
            try {
                long num = Long.parseLong(numStr);
                sum += num;
                count++;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
