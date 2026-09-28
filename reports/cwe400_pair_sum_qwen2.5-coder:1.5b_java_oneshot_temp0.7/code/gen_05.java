import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int goal = Integer.parseInt(line.trim());
        int pairs = 0;
        boolean first = true;
        for (int i = 0; i < goal; i++) {
            String f = br.readLine();
            if (f == null || f.isEmpty()) continue;
            try {
                int n = Integer.parseInt(f);
                if (first) {
                    first = false;
                    continue;
                }
                for (int j = i + 1; j < goal; j++) {
                    int m = Integer.parseInt(br.readLine());
                    if (m == null || m.isEmpty()) continue;
                    if (n + m == goal) {
                        pairs++;
                    }
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
