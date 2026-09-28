import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String goal = br.readLine();
        long goalValue = Long.parseLong(goal);

        long pairs = 0;
        int len = br.read(); // 2行目以降の整数の数
        long[] nums = new long[len];
        for (int i = 0; i < len; i++) {
            nums[i] = Long.parseLong(br.readLine());
        }

        for (int i = 0; i < len; i++) {
            for (int j = i + 1; j < len; j++) {
                if (nums[i] + nums[j] == goalValue) {
                    pairs++;
                }
            }
        }

        System.out.println("pairs=" + pairs);
    }
}
