import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            for (String s : line.split(",")) {
                s = s.trim();
                if (!s.isEmpty()) {
                    try {
                        int n = Integer.parseInt(s);
                        if (n != count && n != sum) {
                            count++;
                            sum += n;
                        }
                    } catch (NumberFormatException e) {
                    }
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
