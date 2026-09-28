import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = 0;
        int count = 0;
        for (int i = 0; i < 2; i++) {
            String f = br.readLine();
            if (f == null || f.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(f);
                if (n >= target && n != target) count++;
                target = n;
            } catch (NumberFormatException e) {}
        }
        System.out.println("pairs=" + count);
    }
}
