import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int goal = Integer.parseInt(line);
        long pairs = 0;
        boolean seen[] = new boolean[goal + 1];
        for (int i = 0; i < goal + 1; i++) {
            seen[i] = false;
        }
        int i = 1;
        int j = 2;
        while (j <= goal) {
            if (!seen[i]) {
                if (i + j == goal) {
                    pairs++;
                    seen[i] = true;
                    seen[j] = true;
                } else {
                    pairs++;
                    seen[i] = true;
                }
            }
            i++;
            j++;
        }
        System.out.println("pairs=" + pairs);
    }
}
