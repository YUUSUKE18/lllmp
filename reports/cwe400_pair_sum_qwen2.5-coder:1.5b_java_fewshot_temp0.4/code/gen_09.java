import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = Long.parseLong(line.trim());
        int pairs = 0;
        int i = 0;
        while (i < target && i < Integer.MAX_VALUE) {
            long sum = 0;
            int j = 0;
            while (j < target && j < Integer.MAX_VALUE) {
                sum += i + j;
                if (sum == target) {
                    pairs++;
                }
                j++;
            }
            i++;
        }
        System.out.println("pairs=" + pairs);
    }
}
