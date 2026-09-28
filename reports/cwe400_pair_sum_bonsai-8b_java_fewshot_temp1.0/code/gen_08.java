import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = 0;
        if (line != null) target = Long.parseLong(line);
        long sum = 0, count = 0;
        int i = 0;
        String[] nums = new String[100];
        while (i < 100 && line != null) {
            line = br.readLine();
            if (line == null || line.trim().isEmpty()) continue;
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    long num = Long.parseLong(part);
                    nums[i++] = String.valueOf(num);
                } catch (NumberFormatException e) {
                }
            }
        }
        for (int j = 0; j < 100; j++) {
            for (int k = j + 1; k < 100; k++) {
                if (nums[j] != null && nums[k] != null) {
                    long val = Long.parseLong(nums[j]) + Long.parseLong(nums[k]);
                    if (val == target) count++;
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
