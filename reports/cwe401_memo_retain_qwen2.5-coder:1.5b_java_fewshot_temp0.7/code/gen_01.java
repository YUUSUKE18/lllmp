import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int[] memo = new int[1000001]; // 空間にメモ化
        int total = 0;
        while ((line = br.readLine()) != null) {
            for (int n = Integer.parseInt(line); n != 1; n = n % 2 == 0 ? n / 2 : 3 * n + 1) {
                if (memo[n] != 0) {
                    total += memo[n];
                    break;
                }
                memo[n] = total;
            }
            total++;
        }
        System.out.println("total=" + total);
    }
}
