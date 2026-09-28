import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder memo = new StringBuilder();
        int total = 0;
        int[] cache = new int[1000000000000]; // 64ビット範囲をカバーし、メモ化

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                break;
            }
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(part);
                    if (cache[n] != 0) continue; // メモ化済み
                    int steps = 0;
                    int current = n;
                    while (current != 1) {
                        current = (current % 2 == 0) ? current / 2 : 3 * current + 1;
                        if (cache[current] != 0) break;
                        cache[current] = steps + 1;
                        steps++;
                    }
                    if (cache[1] == 0) steps = 0;
                    total += steps;
                } catch (NumberFormatException e) {}
            }
        }
        System.out.println("total=" + total);
    }
}
