import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = 0;
        long count = 0;
        if (line != null) {
            try {
                target = Long.parseLong(line);
            } catch (NumberFormatException e) {
            }
        }
        long sum = 0;
        int index = 0;
        int[] nums = new int[1000000]; // 1 million numbers
        int validNumbers = 0;
        int validIndex = 0;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                nums[validIndex++] = Long.parseLong(line);
                if (nums[validIndex - 1] != 0) {
                    if (sum + nums[validIndex - 1] == target) {
                        count++;
                    }
                    if (validIndex > 1) {
                        sum += nums[validIndex - 1];
                    }
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
