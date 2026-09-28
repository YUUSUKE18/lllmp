import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder memo = new StringBuilder();
        int total = 0;
        String line = br.readLine();
        while (line != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            for (String s : line.split("\\s+")) {
                if (s.isEmpty()) continue;
                int n = Integer.parseInt(s);
                if (n == 1) {
                    total += 0;
                    continue;
                }
                if (n % 2 == 0) {
                    int current = n / 2;
                    int steps = 0;
                    while (current != 1) {
                        if (memo.contains(String.valueOf(current))) {
                            steps += memo.indexOf(String.valueOf(current)) - memo.indexOf("1");
                            break;
                        }
                        current = current / 2;
                        if (current == 0) break;
                        memo.append(String.valueOf(current));
                        if (current == 0) break;
                        steps++;
                    }
                    if (memo.contains("1")) {
                        total += steps;
                    }
                } else {
                    int current = 3 * n + 1;
                    int steps = 0;
                    while (current != 1) {
                        if (memo.contains(String.valueOf(current))) {
                            steps += memo.indexOf(String.valueOf(current)) - memo.indexOf("1");
                            break;
                        }
                        current = current % 4 == 0 ? current / 4 : (current + 1) / 2;
                        if (current == 0) break;
                        memo.append(String.valueOf(current));
                        if (current == 0) break;
                        steps++;
                    }
                    if (memo.contains("1")) {
                        total += steps;
                    }
                }
            }
        }
        System.out.println("total=" + total);
    }
}
