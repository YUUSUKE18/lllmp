import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int count = 0;
        long sum = 0;
        String[] numbers = line.trim().split("\\d+");
        if (numbers.length > 0) count = numbers.length;
        for (int i = 0; i < count; i++) {
            String nextLine = br.readLine();
            if (nextLine == null) break;
            String[] nums = nextLine.trim().split("\\d+");
            if (nums.length > 0) {
                long num = Long.parseLong(nums[0]);
                sum += num;
                count++;
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
