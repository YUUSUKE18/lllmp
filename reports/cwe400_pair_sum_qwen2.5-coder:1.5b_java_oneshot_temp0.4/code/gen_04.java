import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int count = 0;
        int[] nums = new int[1000000];
        int numCount = 0;
        boolean first = true;
        while ((line = br.readLine()) != null) {
            if (line.isEmpty()) continue;
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    if (first) { nums[numCount++] = n; first = false; }
                    else { nums[numCount++] = n; }
                } catch (NumberFormatException e) {
                }
            }
        }
        for (int i = 0; i < numCount - 1; i++) {
            for (int j = i + 1; j < numCount; j++) {
                if (nums[i] + nums[j] == target) {
                    count++;
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
