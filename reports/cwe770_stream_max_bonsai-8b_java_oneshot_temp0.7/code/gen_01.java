import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        int max = 0;
        boolean first = true;
        if (line != null) {
            for (String f : line.trim().split(",")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    count++;
                    if (first || n > max) { max = n; first = false; }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " max=" + max);
    }
}
