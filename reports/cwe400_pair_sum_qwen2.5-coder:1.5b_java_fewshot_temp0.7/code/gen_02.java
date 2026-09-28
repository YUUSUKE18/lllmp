import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = Long.parseLong(line);
        long count = 0;
        long[] nums = new long[1000000];
        int numCount = 0;
        while ((line = br.readLine()) != null) {
            for (String numStr : line.trim().split("\\s+")) {
                if (!numStr.trim().isEmpty()) {
                    long num = Long.parseLong(numStr);
                    nums[numCount++] = num;
                }
            }
        }
        for (int i = 0; i < numCount; i++) {
            for (int j = i + 1; j < numCount; j++) {
                if (nums[i] + nums[j] == target) {
                    count++;
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
