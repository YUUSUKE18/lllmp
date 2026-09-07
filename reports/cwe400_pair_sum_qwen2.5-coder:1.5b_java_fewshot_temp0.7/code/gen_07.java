import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.split(" ")[0]);
        int count = 0;
        int[] nums = new int[100000]; // 100000は適当な上限
        int n = 0;
        int i = 0;
        while ((ch = br.read()) != -1) {
            if (ch == '\n') {
                if (n > 1) {
                    for (int j = 0; j < n; j++) {
                        for (int k = j + 1; k < n; k++) {
                            if (nums[j] + nums[k] == target) count++;
                        }
                    }
                }
                n = 0;
                i = 0;
            } else {
                nums[i++] = ch - '0';
            }
        }
        System.out.println("pairs=" + count);
    }
}
