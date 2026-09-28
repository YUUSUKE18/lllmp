import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        int max = Integer.MIN_VALUE;
        if (line != null) {
            String[] elements = line.trim().split("\\s*,\\s+");
            for (String e : elements) {
                if (e.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(e);
                    count++;
                    if (n > max) { max = n; }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " max=" + max);
    }
}
