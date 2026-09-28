import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int cnt = 0;
        int cur = 0, i = 0;
        while ((i < target) && (i < Integer.MAX_VALUE - target)) {
            cur += i;
            if (cur > target) break;
            i++;
        }
        cnt = i - 1;
        int j = i + 1;
        while ((j < Integer.MAX_VALUE) && (j < target)) {
            cur += j;
            if (cur > target) break;
            i++;
            j++;
        }
        System.out.println("pairs=" + cnt);
    }
}
