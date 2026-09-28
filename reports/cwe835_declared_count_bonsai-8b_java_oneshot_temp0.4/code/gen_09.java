import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long sum = 0;
        if (line != null) {
            try {
                count = Integer.parseInt(line);
            } catch (NumberFormatException e) {
                count = 0;
            }
        }
        for (int i = 1; i < 2; i++) {
            String row = br.readLine();
            if (row == null) break;
            try {
                int num = Integer.parseInt(row);
                count++;
                sum += num;
            } catch (NumberFormatException e) {
                // ランキングのための処理は不要
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
