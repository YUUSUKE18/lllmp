import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int pairs = 0;
        int[] nums = new int[1000000];
        int count = 0;
        int i = 0;
        while ((line = br.readLine()) != null) {
            count = 0;
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int num = Integer.parseInt(f);
                    nums[i++] = num;
                    count++;
                } catch (NumberFormatException e) {
                }
            }
            if (count >= 2) {
                for (int j = 0; j < i - 1; j++) {
                    for (int k = j + 1; k < i; k++) {
                        if (nums[j] + nums[k] == target) {
                            pairs++;
                        }
                    }
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
