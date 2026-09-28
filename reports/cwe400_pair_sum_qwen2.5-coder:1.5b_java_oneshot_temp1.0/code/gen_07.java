import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int count = 0;
        int n = 0;
        for (int i = 1; i <= 1000; i++) {
            line = br.readLine();
            if (line == null) break;
            int[] arr = new int[i];
            int[] freq = new int[i];
            int pos = 0;
            boolean first = true;
            for (String f : line.trim().split("\\s+")) {
                if (f.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(f);
                    arr[pos] = n;
                    if (first) { freq[n] = 1; first = false; }
                    else { freq[n]++; }
                } catch (NumberFormatException e) {
                }
            }
            for (int j = 0; j < i; j++) {
                if (arr[j] == target && arr[i - j - 1] == target && freq[arr[j]] > 1) {
                    count++;
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
